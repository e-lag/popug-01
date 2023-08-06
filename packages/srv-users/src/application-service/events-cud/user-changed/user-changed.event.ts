import { User } from '../../../entities/user.entity';

export class UserChangedEvent {
  constructor(public readonly user: User) {}
}
