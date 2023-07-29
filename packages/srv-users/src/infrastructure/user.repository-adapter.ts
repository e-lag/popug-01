import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

import { User } from '../entities/user.entity';
import { AuthService } from './auth/auth.service';

@Injectable()
export class UserRepositoryAdapter {
  constructor(
    private readonly moduleRef: ModuleRef,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  public getAccessToken(user: User): string {
    return this.authService.generateAccessToken(user);
  }

  public userEmailConfirmCodeGenerate(): string {
    const maxValue = 9;
    const codeGen = (): string =>
      Math.round(Math.random() * maxValue).toString();
    return Array.from({ length: 6 })
      .map(() => codeGen())
      .join('');
  }
}
