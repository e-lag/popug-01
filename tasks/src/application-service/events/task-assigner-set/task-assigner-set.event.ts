import { Task } from '../../../enitities/task.entity';

export class TaskAssignerSetEvent {
  constructor(public readonly task: Task) {}
}
