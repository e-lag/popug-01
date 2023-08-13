import { User } from '../enitities/user.entity';

export type UserProfile = {
  avatar: User['avatar'];
  // isDeveloper: User['isDeveloper'];
  email: User['email'];
  emailConfirmed: User['emailConfirmed'];
  nikName: User['nikName'];
  phone: User['phone'];
  role: User['role'];
};
