import { Task } from '../../../enitities/task.entity';

export class TaskChangedStreamEvent {
  constructor(public readonly task: Task) {}
}
