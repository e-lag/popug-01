import { randomBytes } from 'node:crypto';
import { pbkdf2Sync } from 'pbkdf2';

import { User } from '../../entities/user.entity';

import { PASSWORD_HASH_CONFIG } from '../../configs';

export interface UserPasswordSetCase {
  passwordSet(password: string): void;
}

export const USER_PASSWORD_SET_CASE = function (
  this: User,
  newPassword: string,
): void {
  const saltBytes = 128;
  const salt = randomBytes(saltBytes).toString('base64');
  const { iterations, keylen, digest } = PASSWORD_HASH_CONFIG;
  const hash = pbkdf2Sync(
    newPassword,
    salt,
    iterations,
    keylen,
    digest,
  ).toString('utf8');
  this.password = {
    salt,
    hash: hash,
    iterations,
    keylen,
    digest,
  };
};
