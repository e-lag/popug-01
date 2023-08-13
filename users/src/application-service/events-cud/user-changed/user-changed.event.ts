import { User } from '../../../enitities/user.entity';

export class UserChangedEvent {
  constructor(public readonly user: User) {}
}
