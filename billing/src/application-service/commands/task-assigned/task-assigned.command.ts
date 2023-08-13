import { Task } from '../../../enitities/task.entity';

export class TaskAssignedCommand {
  constructor(public readonly task: Task) {}
}
