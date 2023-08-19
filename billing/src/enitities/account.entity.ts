import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
  Ref,
} from '@mikro-orm/core';
import { AccountAssignedTask } from './account-assigned-task.entity';
import { AccountFinishedTask } from './account-finished-task.entity';
import { User } from './user.entity';

@Entity()
export class Account {
  @PrimaryKey({ type: 'uuid' })
  public readonly id: string;

  @Property()
  public readonly day: Date;

  @ManyToOne(() => User)
  public assigner: Ref<User>;

  @OneToMany(() => AccountAssignedTask, (task) => task.account)
  public assignedTasks: Collection<AccountAssignedTask>;

  @OneToMany(() => AccountFinishedTask, (task) => task.account)
  public finishedTasks: Collection<AccountFinishedTask>;

  @Property()
  public balance: number;

  @Property()
  public assignSum: number;

  @Property()
  public finishSum: number;

  @Property()
  public close: boolean;

  @Property()
  public paid: boolean;

  @Property()
  public reportSend: boolean;

  @Property({ nullable: true })
  public mostExpensiveTask?: number | undefined;

  @Property({ nullable: true })
  public mostChipTask?: number | undefined;
}
