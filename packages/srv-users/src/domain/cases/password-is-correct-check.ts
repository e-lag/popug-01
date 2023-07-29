import { pbkdf2Sync } from 'pbkdf2';

import { User } from '../../entities/user.entity';

export interface UserPasswordIsCorrectCheck {
  passwordIsCorrectCheck(password: string): void;
}

export const USER_PASSWORD_IS_CORRECT_CHECK = function (
  this: User,
  checkingPassword: string,
): boolean {
  if (!this.password) {
    return false;
  }

  const { salt, iterations, keylen, digest } = this.password;
  return (
    this.password.hash ===
    pbkdf2Sync(checkingPassword, salt, iterations, keylen, digest).toString(
      'utf8',
    )
  );
};
