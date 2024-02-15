import { Entity, OneToOne, Ref } from '@mikro-orm/core';
import { Identified } from '@popug/common';
import { Task } from '@popug/common/dist/shared/task/task.entity';

@Entity()
export class AccountFinishedTask extends Identified {
  @OneToOne(() => Task, { ref: true })
  public task: Ref<Task>;

  constructor(props: Omit<AccountFinishedTask, keyof Identified>) {
    super();
    this.task = props.task;
  }
}
