import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { User } from '../enitities/user.entity';

import { JWT_CONFIG } from './jwt-configuraiton';
import { JwtPayloadDto } from './jwt-payload.dto';

/**
 * Сервис JWT стратегии
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  _logger = new Logger(JwtStrategy.name);

  /**
   * Создает сервис JWT стратегии
   // * @param configService - сервис конфигурации
   // * @param userFacade - фасад домена пользователя
   */
  constructor(
    private readonly configService: ConfigService,
    private readonly em: EntityManager,
  ) {
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
  public async validate(payload: JwtPayloadDto): Promise<User> {
    this._logger.debug({ validate: payload });
    const user = await this.em.findOne(User, { id: payload.sub }).catch(() => {
      this._logger.debug({ validate: 'UnauthorizedException' });
      throw new UnauthorizedException();
    });

    if (!user) {
      this._logger.debug({ validate: 'User not found' });
      throw new UnauthorizedException();
    }

    return user;
  }
}
