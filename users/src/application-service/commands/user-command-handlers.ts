import { AvatarAddCommandHandler } from './avatar-add/avatar-add.command-handler';
import { EmailConfirmCommandHandler } from './email-confirm/email-confirm.command-handler';
import { NikNameChangeCommandHandler } from './nik-name-change/nik-name-change.command-handler';
import { PasswordChangeCommandHandler } from './password-change/password-change.command-handler';
import { UserEmailChangeCommandHandler } from './user-email-change/user-email-change.command-handler';
import { UserLoginCommandHandler } from './user-login/user-login.command-handler';
import { UserLogoutCommandHandler } from './user-logout/user-logout.command-handler';
import { UserRegisterCommandHandler } from './user-register/user-register.command-handler';
import { UserRoleChangeCommandHandler } from './user-role-change/user-role-change.command-handler';

export const USER_COMMAND_HANDLERS = [
  AvatarAddCommandHandler,
  EmailConfirmCommandHandler,
  NikNameChangeCommandHandler,
  PasswordChangeCommandHandler,
  UserLoginCommandHandler,
  UserRegisterCommandHandler,
  UserLogoutCommandHandler,
  UserEmailChangeCommandHandler,
  UserRoleChangeCommandHandler,
];
