import { Task } from '../../../enitities/task.entity';
import { User } from '../../../enitities/user.entity';

export class TasksQuery {
  constructor(
    public readonly query: {
      assigner?: User['id'] | undefined;
      taskStatus?: Task['status'] | undefined;
      limit?: number | undefined;
      offset?: number | undefined;
    },
  ) {}
}
