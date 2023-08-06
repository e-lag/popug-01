import { Entity, Property } from '@mikro-orm/core';
import { Identified } from '@popug/common';

@Entity()
export class UserEmailConfirm extends Identified {
  // @PrimaryKey()
  // id: string; //       uuid        not null,

  @Property()
  userId: string; //  uuid not null

  @Property()
  email: string; //    varchar     not null,

  @Property()
  code: string; //     varchar     not null,

  @Property()
  activeUntil: Date; //    TIMESTAMPTZ not null,

  @Property()
  confirmed: boolean; // bool        not null default false,

  // @Property()
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
