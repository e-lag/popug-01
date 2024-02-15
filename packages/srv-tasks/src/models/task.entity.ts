import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Identified, User } from '@popug/common';

import { TaskStatuses } from '../infrastructure/task-statuses.enum';

@Entity()
export class Task extends Identified {
  @Property()
  public title: string;

  @Property({ nullable: false })
  public description: string;

  @ManyToOne(() => User)
  public assigner: User;

  @Property({ nullable: false })
  public price: string;

  @Property({ nullable: false })
  public status: TaskStatuses;

  constructor(props: Omit<Task, keyof Identified>) {
    super();
    this.title = props.title;
    this.description = props.description;
    this.assigner = props.assigner;
    this.price = props.price;
    this.status = props.status;
  }
}
