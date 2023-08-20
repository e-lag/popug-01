import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryKey,
  Property,
  Ref,
} from '@mikro-orm/core';
import { Task } from './task.entity';
import { User } from './user.entity';

@Entity()
export class Account {
  @PrimaryKey({ type: 'uuid' })
  public readonly id: string;

  @Property()
  public readonly day: Date;

  @ManyToOne(() => User)
  public assigner: Ref<User>;

  @ManyToMany(() => Task)
  public assignedTasks: Collection<Task>;

  @ManyToMany(() => Task)
  public finishedTasks: Collection<Task>;

  @Property()
  public balance: number;

  @Property()
  public close: boolean;

  @Property()
  public paid: boolean;

  @Property()
  public reportSend: boolean;

  constructor(props: Account) {
    this.id = props.id;
    this.day = props.day;
    this.assigner = props.assigner;
    this.assignedTasks = props.assignedTasks;
    this.finishedTasks = props.finishedTasks;
    this.balance = props.balance;
    this.close = props.close;
    this.paid = props.paid;
    this.reportSend = props.reportSend;
  }
}
