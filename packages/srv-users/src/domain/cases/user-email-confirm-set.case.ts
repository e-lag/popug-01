import { User } from '../../entities/user.entity';

export interface UserEmailConfirmSetCase {
  emailConfirmSet(password: string): void;
}

export const USER_EMAIL_CONFIRM_SET_CASE = function (
  this: User,
  email: string,
): void {
  this.email = email;
  this.emailConfirmed = true;
};
