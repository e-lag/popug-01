import { User } from '../entities/user.entity';

export type UserProfile = {
  avatar: User['avatar'];
  // isDeveloper: User['isDeveloper'];
  email: User['email'];
  emailConfirmed: User['emailConfirmed'];
  nikName: User['nikName'];
  phone: User['phone'];
  roles: User['roles'];
};
