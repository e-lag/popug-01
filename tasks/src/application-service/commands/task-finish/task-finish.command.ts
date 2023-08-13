import { Task } from '../../../enitities/task.entity';
import { User } from '../../../enitities/user.entity';

export class TaskFinishCommand {
  constructor(
    public readonly id: Task['id'],
    public readonly user: User,
  ) {}
}
