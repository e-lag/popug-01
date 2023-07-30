import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';
import { PassportStrategy } from '@nestjs/passport';
import { MobileJwtPayloadDto } from '@popug/utils-auth';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

import { UserFacade } from '../../application-service';
import { JWT_CONFIG } from './jwt-configuraiton';

/**
 * Сервис JWT стратегии
 */
@Injectable()
export class MobileJwtStrategy extends PassportStrategy(
  Strategy,
  'mobile-jwt',
) {
  /**
   * Создает сервис JWT стратегии
   // * @param configService - сервис конфигурации
   // * @param userFacade - фасад домена пользователя
   */
  constructor(
    private readonly configService: ConfigService,
    private readonly userFacade: UserFacade,
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
  public async validate(payload: MobileJwtPayloadDto): Promise<string> {
    await this.userFacade.profile(payload.sub).catch(() => {
      throw new UnauthorizedException();
    });
    return payload.sub;
  }
}
