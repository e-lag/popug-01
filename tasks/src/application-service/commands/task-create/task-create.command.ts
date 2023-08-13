import { Task } from '../../../enitities/task.entity';

export class TaskCreateCommand {
  constructor(
    public readonly task: Omit<
      Task,
      | 'id'
      | 'createdAt'
      | 'updatedAt'
      | 'priceAssign'
      | 'priceFinish'
      | 'assigner'
      | 'status'
    >,
  ) {}
}
