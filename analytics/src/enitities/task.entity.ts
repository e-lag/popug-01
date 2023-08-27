import { Entity, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { TaskStatuses } from '../enums/task-statuses.enum';

import { User } from './user.entity';

@Entity()
export class Task {
  @PrimaryKey({ type: 'uuid' })
  public id: string;

  @Property()
  public title: string;

  @Property({ nullable: true })
  public jiraId?: string | undefined;

  @Property({ nullable: false })
  public description: string;

  @ManyToOne(() => User)
  public assigner: Ref<User>;

  @Property({ nullable: false })
  public priceAssign: number;

  @Property({ nullable: false })
  public priceFinish: number;

  @Property({ nullable: false })
  public status: TaskStatuses;

  @Property({ nullable: false })
  public createdAt: Date;

  @Property({ nullable: false })
  public updatedAt: Date;

  constructor(props: Task) {
    this.id = props.id;
    this.title = props.title;
    this.jiraId = props.jiraId;
    this.description = props.description;
    this.assigner = props.assigner;
    this.priceAssign = props.priceAssign;
    this.priceFinish = props.priceFinish;
    this.status = props.status;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
