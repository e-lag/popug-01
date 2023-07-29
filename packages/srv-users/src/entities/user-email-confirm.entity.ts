import { Entity, Property } from '@mikro-orm/core';
import { Identified } from '@popug/utils-micro-orm';

@Entity()
export class UserEmailConfirm extends Identified {
  // @PrimaryKey()
  // id: string; //       uuid        not null,

  @Property({ nullable: false })
  userId: string; //  uuid not null

  @Property({ nullable: false })
  email: string; //    varchar     not null,

  @Property({ nullable: false })
  code: string; //     varchar     not null,

  @Property({ nullable: false })
  activeUntil: Date; //    TIMESTAMPTZ not null,

  @Property({ nullable: false })
  confirmed: boolean; // bool        not null default false,

  // @Property({ nullable: false })
  // createAt: Date = new Date(); // TIMESTAMPTZ           NOT NULL default now(),

  constructor(userEmailConfirm: Omit<UserEmailConfirm, keyof Identified>) {
    super();
    this.userId = userEmailConfirm.userId;
    this.email = userEmailConfirm.email;
    this.code = userEmailConfirm.code;
    this.activeUntil = userEmailConfirm.activeUntil;
    this.confirmed = userEmailConfirm.confirmed;
  }
}
