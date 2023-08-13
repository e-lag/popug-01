import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { LoginResponseDto, RegisterResponseDto } from '../dtos';
import { User } from '../enitities/user.entity';
import { UserProfile } from '../types/user-profile.type';
import { AvatarAddCommand } from './commands/avatar-add/avatar-add.command';
import { EmailConfirmCommand } from './commands/email-confirm/email-confirm.command';
import { NikNameChangeCommand } from './commands/nik-name-change/nik-name-change.command';
import { PasswordChangeCommand } from './commands/password-change/password-change.command';
import { UserEmailChangeCommand } from './commands/user-email-change/user-email-change.command';
import { UserLoginCommand } from './commands/user-login/user-login.command';
import { UserLogoutCommand } from './commands/user-logout/user-logout.command';
import { UserRegisterCommand } from './commands/user-register/user-register.command';
import { ProfileQuery } from './query/profile/profile.query';

@Injectable()
export class UserFacade {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  public register(
    email: User['email'],
    password: string,
    passwordConfirm: string,
    deviceId: string,
  ): Promise<RegisterResponseDto> {
    return this.commandBus.execute(
      new UserRegisterCommand(email, password, passwordConfirm, deviceId),
    );
  }

  public emailConfirm(
    userId: User['id'],
    email: string,
    confirmCode: string,
  ): Promise<void> {
    return this.commandBus.execute<EmailConfirmCommand, void>(
      new EmailConfirmCommand(userId, email, confirmCode),
    );
  }

  public changePassword(
    userId: User['id'],
    passwordCurrent: string,
    passwordNew: string,
    passwordNewConfirm: string,
  ): Promise<void> {
    return this.commandBus.execute(
      new PasswordChangeCommand(
        userId,
        passwordCurrent,
        passwordNew,
        passwordNewConfirm,
      ),
    );
  }

  public nikNameChange(userId: User['id'], nikName: string): Promise<void> {
    return this.commandBus.execute(new NikNameChangeCommand(userId, nikName));
  }

  public avatarAdd(userId: User['id'], avatar: string): Promise<void> {
    return this.commandBus.execute(new AvatarAddCommand(userId, avatar));
  }

  public login(email: string, password: string): Promise<LoginResponseDto> {
    return this.commandBus.execute(new UserLoginCommand(email, password));
  }

  public profile(userId: User['id']): Promise<UserProfile> {
    return this.queryBus.execute(new ProfileQuery(userId));
  }

  public async logout(userId: User['id'], token: string): Promise<void> {
    return this.commandBus.execute(new UserLogoutCommand(userId, token));
  }

  public emailChange(userId: User['id'], email: string): Promise<void> {
    return this.commandBus.execute(new UserEmailChangeCommand(userId, email));
  }
}
