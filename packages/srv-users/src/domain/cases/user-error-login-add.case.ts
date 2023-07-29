import { INTERVAL_15_MINUTES } from '@popug/utils-common';

import { User } from '../../entities/user.entity';

import { MAX_INCORRECT_LOGINS } from '../../configs/config.consts';

export interface UserErrorLoginAddCase {
  errorLoginAdd(): void;
}

export const USER_ERROR_LOGIN_ADD_CASE = function (this: User): void {
  this.countErrorLogins = this.countErrorLogins + 1;

  if (this.countErrorLogins > MAX_INCORRECT_LOGINS) {
    this.blockUntil = new Date(new Date().getTime() + INTERVAL_15_MINUTES);
  }
};
