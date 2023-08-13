import { User } from '../enitities/user.entity';

export type UserProfile = {
  avatar: User['avatar'];
  email: User['email'];
  nikName: User['nikName'];
  phone: User['phone'];
  role: User['role'];
};
