import { Task } from '../../../enitities/task.entity';

export class TaskFinishedCommand {
  constructor(public readonly task: Task) {}
}
