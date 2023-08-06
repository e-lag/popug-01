import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common/exceptions/forbidden.exception';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

import { User } from '../users';
import { JWT_CONFIG } from './jwt-configuraiton';
import { MobileJwtPayloadDto } from './mobile-jwt-payload.dto';

/**
 * Сервис JWT стратегии
 */
@Injectable()
export class MobileJwtStrategy extends PassportStrategy(Strategy, 'mobile-jwt') {
  /**
   * Создает сервис JWT стратегии
   // * @param configService - сервис конфигурации
   // * @param userFacade - фасад домена пользователя
   */
  constructor(private readonly configService: ConfigService, private readonly em: EntityManager) {
    const jwtConfig = configService.get<JwtModuleOptions>(JWT_CONFIG, {});
    super(<StrategyOptions>{
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig?.publicKey || jwtConfig?.secretOrPrivateKey || '',
    });
  }

  /**
   * Выполняет проверку пользователя по полезной нагрузке jwt токена
   * @param payload
   */
  public async validate(payload: MobileJwtPayloadDto): Promise<User> {
    const {sub: id} = payload;
    const user = await this.em.findOne(User, { id });
    if (!user) {
      throw new ForbiddenException('Unknown user');
    }
    if (!user.isActive) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
