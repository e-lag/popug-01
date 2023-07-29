import { User } from '../entities/user.entity';
import {
  USER_AVATAR_SET_CASE,
  USER_EMAIL_CONFIRM_SET_CASE,
  USER_ERROR_LOGIN_ADD_CASE,
  USER_ERROR_LOGIN_RESET_CASE,
  USER_NIK_SET_CASE,
  USER_PASSWORD_IS_CORRECT_CHECK,
  USER_PASSWORD_SET_CASE,
  UserAvatarSetCase,
  UserEmailConfirmSetCase,
  UserErrorLoginAddCase,
  UserErrorLoginResetCase,
  UserNikSetCase,
  UserPasswordIsCorrectCheck,
  UserPasswordSetCase,
} from './cases';

export class UserDomain
  extends User
  implements
    UserPasswordSetCase,
    UserErrorLoginAddCase,
    UserErrorLoginResetCase,
    UserPasswordIsCorrectCheck,
    UserAvatarSetCase,
    UserEmailConfirmSetCase,
    UserNikSetCase
{
  public passwordSet = USER_PASSWORD_SET_CASE;

  public errorLoginReset = USER_ERROR_LOGIN_RESET_CASE;

  public errorLoginAdd = USER_ERROR_LOGIN_ADD_CASE;

  public passwordIsCorrectCheck = USER_PASSWORD_IS_CORRECT_CHECK;

  public emailConfirmSet = USER_EMAIL_CONFIRM_SET_CASE;

  public avatarSet = USER_AVATAR_SET_CASE;

  public nikSet = USER_NIK_SET_CASE;
}
