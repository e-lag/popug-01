import { User } from '../../../enitities/user.entity';

export class UserRoleChangedEvent {
  constructor(public readonly user: User) {}
}
