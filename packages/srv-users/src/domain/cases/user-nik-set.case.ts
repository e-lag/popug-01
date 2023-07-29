import { User } from '../../entities/user.entity';

export interface UserNikSetCase {
  nikSet(password: string): void;
}

export const USER_NIK_SET_CASE = function (this: User, nik: string): void {
  this.nikName = nik;
};
