import { User } from '../../entities/user.entity';

export interface UserAvatarSetCase {
  avatarSet(password: string): void;
}

export const USER_AVATAR_SET_CASE = function (
  this: User,
  avatar: string,
): void {
  this.avatar = avatar;
};
