import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { UserRoles } from '../types/user-roles.enum';

@Entity({ tableName: 'user' })
export class User {
  @PrimaryKey()
  public id: string;

  @Property({ nullable: true })
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

  @Property()
  public createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  public updatedAt: Date = new Date();

  constructor(props: User) {
    this.avatar = props.avatar;
    this.email = props.email;
    this.role = props.role;
    this.nikName = props.nikName;
    this.phone = props.phone;
    this.isActive = props.isActive;
  }
}
