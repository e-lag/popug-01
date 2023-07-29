import { Entity, Property } from '@mikro-orm/core';
import { Identified } from '@popug/utils-micro-orm';

@Entity()
export class UserLogin extends Identified {
  @Property()
  userId: string; //       uuid not null

  @Property()
  deviceId: string; //     varchar not null,

  @Property()
  active: boolean; //        bool not null default true,

  @Property()
  refreshToken: string; // varchar not null,

  constructor(userLogin: Omit<UserLogin, keyof Identified>) {
    super();
    this.userId = userLogin.userId;
    this.deviceId = userLogin.deviceId;
    this.active = userLogin.active;
    this.refreshToken = userLogin.refreshToken;
  }
}
