import { Collection, Entity, OneToMany } from '@mikro-orm/core';
import { User as UserBase } from '@popug/common';

// eslint-disable-next-line import/no-cycle
import { Account } from './account.entity';

@Entity()
export class User extends UserBase {
  @OneToMany(() => Account, (account) => account.assigner)
  public account: Collection<Account> = new Collection<Account>(this);
}
