import { Entity, Property, Unique } from '@mikro-orm/core';
import { Identified, INTERVAL_15_MINUTES } from '@popug/common';
import { randomBytes } from 'node:crypto';
import { pbkdf2Sync } from 'pbkdf2';

import { UserPassword } from '../types/user-password.type';
import { UserRoles } from '../types/user-roles.enum';

import { MAX_INCORRECT_LOGINS, PASSWORD_HASH_CONFIG } from '../configs';

@Entity({ tableName: 'user' })
@Unique({ properties: ['email'] })
export class User extends Identified {
  @Property({ nullable: true })
  public avatar?: string | undefined;

  @Property({ nullable: true })
  public blockUntil: Date | null = null;

  @Property({ default: 0 })
  public countErrorLogins = 0;

  @Property()
  public email: string;

  @Property()
  public emailConfirmed = false;

  @Property()
  public role: UserRoles;

  @Property({ nullable: true })
  public nikName?: string | undefined;

  @Property({ nullable: true, type: 'json' })
  public password: UserPassword | null;

  @Property({ nullable: true })
  public phone?: string | undefined;

  @Property({ nullable: false })
  public isActive: boolean;

  constructor(
    props: Omit<
      User,
      | keyof Identified
      | 'passwordIsCorrectCheck'
      | 'emailConfirmSet'
      | 'errorLoginAdd'
      | 'errorLoginReset'
      | 'passwordSet'
    >,
  ) {
    super();
    this.avatar = props.avatar;
    this.blockUntil = props.blockUntil;
    this.countErrorLogins = props.countErrorLogins;
    this.email = props.email;
    this.emailConfirmed = props.emailConfirmed;
    this.role = props.role;
    this.nikName = props.nikName;
    this.password = props.password;
    this.phone = props.phone;
    this.isActive = props.isActive;
  }

  public passwordIsCorrectCheck(checkingPassword: string): boolean {
    if (!this.password) {
      return false;
    }

    const { salt, iterations, keylen, digest } = this.password;
    return this.password.hash === pbkdf2Sync(checkingPassword, salt, iterations, keylen, digest).toString('base64');
  }

  public emailConfirmSet(email: string): void {
    this.email = email;
    this.emailConfirmed = true;
  }

  public errorLoginAdd(): void {
    this.countErrorLogins = this.countErrorLogins + 1;

    if (this.countErrorLogins > MAX_INCORRECT_LOGINS) {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      this.blockUntil = new Date(new Date().getTime() + INTERVAL_15_MINUTES);
    }
  }

  public errorLoginReset(): void {
    this.countErrorLogins = 0;
    this.blockUntil = null;
  }

  public passwordSet(newPassword: string): void {
    const saltBytes = 128;
    const salt = randomBytes(saltBytes).toString('base64');
    const { iterations, keylen, digest } = PASSWORD_HASH_CONFIG;
    const hash = pbkdf2Sync(newPassword, salt, iterations, keylen, digest).toString('base64');
    this.password = {
      salt,
      hash: hash,
      iterations,
      keylen,
      digest,
    };
  }
}
