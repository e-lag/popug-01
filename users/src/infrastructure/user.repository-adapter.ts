import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { User } from '../enitities/user.entity';

@Injectable()
export class UserRepositoryAdapter {
  constructor(
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
