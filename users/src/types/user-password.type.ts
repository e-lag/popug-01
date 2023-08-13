export type UserPassword = {
  readonly salt: string;
  readonly hash: string;
  readonly iterations: number;
  readonly keylen: number;
  readonly digest: string;
};
