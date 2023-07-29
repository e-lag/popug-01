import { Entity, Property, Unique } from '@mikro-orm/core';
import { Identified } from '@popug/utils-micro-orm';

import { UserPassword } from '../types/user-password.type';
import { UserRoles } from '../types/user-roles.enum';

@Entity()
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

  @Property({ fieldName: 'password', nullable: true })
  public password: UserPassword | null;

  @Property({ fieldName: 'phone', nullable: true, default: null })
  public phone: string | null = null;

  constructor(props: Omit<User, keyof Identified>) {
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
}
