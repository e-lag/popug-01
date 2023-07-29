import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

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
  constructor(private readonly configService: ConfigService) {
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
  public validate(payload: MobileJwtPayloadDto): string {
    return payload.sub;
  }
}
