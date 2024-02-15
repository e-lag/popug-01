import { Entity, OneToOne, Ref, Reference } from '@mikro-orm/core';
import { Identified } from '@popug/common';
import { Task } from '@popug/common/dist/shared/task/task.entity';

@Entity()
export class AccountAssignTask extends Identified {
  @OneToOne(() => Task, { ref: true })
  public task: Ref<Task>;

  constructor(props: { taskId: string }) {
    super();
    this.task = Reference.createFromPK(Task, props.taskId);
  }
}
