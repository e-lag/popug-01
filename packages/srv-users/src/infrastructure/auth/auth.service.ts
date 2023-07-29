import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignOptions } from 'jsonwebtoken';

import { User } from '../../entities/user.entity';
import { MobileJwtPayloadDto } from './mobile-jwt-payload.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  public generateAccessToken(
    user: User,
    signOptions: SignOptions = { expiresIn: '1y' },
  ): string {
    const payload: Pick<MobileJwtPayloadDto, 'sub' | 'email'> = {
      sub: user.id,
      email: user.email,
    };
    return this.jwtService.sign(payload, signOptions);
  }
}
