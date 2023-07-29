import { UserProfile } from './user-profile.type';

export type UserLoginData = {
  accessToken: string;
  profile: UserProfile;
};
