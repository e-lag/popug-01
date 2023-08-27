import {
  Entity,
  Index,
  ManyToOne,
  PrimaryKey,
  Property,
  Ref,
} from '@mikro-orm/core';
import { UuidGenerator } from '../infrastructure/uuid.generator';
import { Account } from './account.entity';
import { Task } from './task.entity';

@Entity()
export class AccountAssignedTask {
  @PrimaryKey()
  id = UuidGenerator.generate();

  @ManyToOne(() => Account)
  @Index()
  account: Ref<Account>;

  @ManyToOne(() => Task)
  task: Ref<Task>;

  @Property()
  createdAt = new Date();
}
