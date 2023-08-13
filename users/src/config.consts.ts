import { UserPassword } from './types/user-password.type';

export const MAX_INCORRECT_LOGINS = 5;
export const PASSWORD_HASH_CONFIG: Omit<UserPassword, 'hash' | 'salt'> = {
  iterations: 10_000,
  keylen: 32,
  digest: 'sha512',
};
