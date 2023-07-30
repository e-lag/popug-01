import { Entity, Property, Unique } from '@mikro-orm/core';
import { INTERVAL_15_MINUTES } from '@popug/utils-common';
import { Identified } from '@popug/utils-micro-orm';
import { randomBytes } from 'node:crypto';
import { pbkdf2Sync } from 'pbkdf2';

import { UserPassword } from '../types/user-password.type';
import { UserRoles } from '../types/user-roles.enum';

import { MAX_INCORRECT_LOGINS, PASSWORD_HASH_CONFIG } from '../configs';

@Entity({ tableName: 'user' })
@Unique({ properties: ['email'] })
export class User extends Identified {
  @Property({ fieldName: 'avatar', nullable: true, default: null })
  public avatar: string | null = null;

  @Property({ fieldName: 'block_until', nullable: true, default: null })
  public blockUntil: Date | null = null;

  @Property({ fieldName: 'count_error_logins', nullable: false, default: 0 })
  public countErrorLogins = 0;

  @Property({ fieldName: 'email', nullable: false })
  public email: string;

  @Property({ fieldName: 'email_confirmed', nullable: false, default: false })
  public emailConfirmed = false;

  @Property({
    fieldName: 'roles',
    nullable: false,
    default: [],
  })
  public roles: UserRoles[] = [];

  @Property({ fieldName: 'nik_name', nullable: true, default: null })
  public nikName: string | null = null;

  @Property({ fieldName: 'password', nullable: true, type: 'json' })
  public password: UserPassword | null;

  @Property({ fieldName: 'phone', nullable: true, default: null })
  public phone: string | null = null;

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
    this.roles = props.roles;
    this.nikName = props.nikName;
    this.password = props.password;
    this.phone = props.phone;
  }

  public passwordIsCorrectCheck(checkingPassword: string): boolean {
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
  }

  public emailConfirmSet(email: string): void {
    this.email = email;
    this.emailConfirmed = true;
  }

  public errorLoginAdd(): void {
    this.countErrorLogins = this.countErrorLogins + 1;

    if (this.countErrorLogins > MAX_INCORRECT_LOGINS) {
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
  }
}
