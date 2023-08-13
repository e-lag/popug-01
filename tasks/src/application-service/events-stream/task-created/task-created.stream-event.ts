import { Task } from '../../../enitities/task.entity';

export class TaskCreatedStreamEvent {
  constructor(
    public readonly task: Task,
  ) {
  }
}
