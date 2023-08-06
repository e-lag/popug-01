import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MobileJwtPayloadDto } from '@popug/common';
import { SignOptions } from 'jsonwebtoken';

import { User } from '../../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  public generateAccessToken(user: User, signOptions: SignOptions = { expiresIn: '1y' }): string {
    const payload: Pick<MobileJwtPayloadDto, 'sub'> = {
      sub: user.id,
    };
    return this.jwtService.sign(payload, signOptions);
  }
}
