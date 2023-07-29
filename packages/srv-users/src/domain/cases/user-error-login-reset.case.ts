import { User } from '../../entities/user.entity';

export interface UserErrorLoginResetCase {
  errorLoginReset(): void;
}

export const USER_ERROR_LOGIN_RESET_CASE = function (this: User): void {
  this.countErrorLogins = 0;
  this.blockUntil = null;
};
