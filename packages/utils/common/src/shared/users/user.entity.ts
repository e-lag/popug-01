import { Entity, Property, Unique } from '@mikro-orm/core';

import { Identified } from '../micro-orm';
import { UserRoles } from './user-roles.enum';

@Entity({ tableName: 'users' })
@Unique({ properties: ['email'] })
export class User extends Identified {
  @Property({ nullable: true, default: null })
  public avatar?: string | undefined;

  @Property()
  public email: string;

  @Property()
  public role: UserRoles;

  @Property({ nullable: true })
  public nikName?: string | undefined;

  @Property({ nullable: true })
  public phone?: string | undefined;

  @Property({ nullable: false })
  public isActive: boolean;

  constructor(props: User) {
    super();
    this.id = props.id;
    this.avatar = props.avatar;
    this.email = props.email;
    this.role = props.role;
    this.nikName = props.nikName;
    this.phone = props.phone;
    this.isActive = props.isActive;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
