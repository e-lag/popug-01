import { Task } from '../../../enitities/task.entity';

export class TaskFinishedEvent {
  constructor(public readonly task: Task) {}
}
