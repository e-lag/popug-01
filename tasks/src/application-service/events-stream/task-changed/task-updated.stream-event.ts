import { Task } from '../../../enitities/task.entity';

export class TaskUpdatedStreamEvent {
  constructor(public readonly task: Task) {}
}
