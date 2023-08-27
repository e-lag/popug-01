import { Task } from '../../../enitities/task.entity';

export class TaskAssignedEvent {
  constructor(public readonly task: Task) {}
}
