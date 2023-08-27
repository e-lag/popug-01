import { Entity, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { TaskStatuses } from '../enums/task-statuses.enum';
import { Task } from './task.entity';
import { User } from './user.entity';

@Entity()
export class TaskStatisticsEntity {
  @PrimaryKey({ type: 'uuid' })
  public id!: string;

  @ManyToOne(() => User)
  public assigner!: Ref<User>;

  @ManyToOne(() => Task)
  public task!: Ref<Task>;

  @Property({ nullable: false })
  public priceAssign!: number;

  @Property({ nullable: false })
  public priceFinish!: number;

  @Property({ nullable: false })
  public action!: string;

  @Property({ nullable: false })
  public status!: TaskStatuses;

  @Property({ nullable: false })
  public createdAt!: Date;
}
