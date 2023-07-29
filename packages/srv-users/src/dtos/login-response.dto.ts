import { ApiProperty } from '@nestjs/swagger';

import { UserLoginData } from '../types/user-login-data.type';
import { UserProfileDto } from './user-profile.dto';

export class LoginResponseDto implements UserLoginData {
  @ApiProperty()
  profile!: UserProfileDto;

  @ApiProperty()
  accessToken!: string;
}
