import { Collection, Entity, ManyToMany, ManyToOne, Property } from '@mikro-orm/core';
import { Identified, Task } from '@popug/common';

// eslint-disable-next-line import/no-cycle
import { User } from './user.entity';

@Entity()
export class Account extends Identified {
  @ManyToOne(() => User)
  public assigner: User;

  @Property()
  public date: string;

  @ManyToMany(() => Task)
  assignedTasks: Collection<Task> = new Collection<Task>(this);

  @ManyToMany(() => Task)
  finishedTasks: Collection<Task> = new Collection<Task>(this);

  @Property()
  balance: number;

  @Property()
  paid: boolean;

  @Property()
  reportSend: boolean;

  constructor(props: Omit<Account, keyof Identified>) {
    super();
    this.assigner = props.assigner;
    this.date = props.date;
    this.assignedTasks = props.assignedTasks;
    this.finishedTasks = props.finishedTasks;
    this.balance = props.balance;
    this.paid = props.paid;
    this.reportSend = props.reportSend;
  }
}
