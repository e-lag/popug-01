import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignOptions } from 'jsonwebtoken';
import { User } from '../../enitities/user.entity';
import { JwtPayloadDto } from './jwt-payload.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  public generateAccessToken(
    user: User,
    signOptions: SignOptions = { expiresIn: '1y' },
  ): string {
    const payload: Pick<JwtPayloadDto, 'sub'> = {
      sub: user.id,
    };
    return this.jwtService.sign(payload, signOptions);
  }
}
