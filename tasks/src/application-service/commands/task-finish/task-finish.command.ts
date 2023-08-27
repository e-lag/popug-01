import { User } from '../../../enitities/user.entity';

export class TaskFinishCommand {
  constructor(
    public readonly id: string,
    public readonly user: User,
  ) {}
}
