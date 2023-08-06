import { ApiProperty } from '@nestjs/swagger';
import { number } from 'zod';

import { User } from '../entities/user.entity';
import { UserProfile } from '../types/user-profile.type';

export class UserProfileDto implements UserProfile {
  @ApiProperty({ type: String, nullable: true })
  public avatar!: User['avatar'];

  @ApiProperty({ type: String, nullable: false })
  public email!: User['email'];

  @ApiProperty({ type: Boolean, nullable: false })
  public emailConfirmed!: User['emailConfirmed'];

  @ApiProperty({ type: String, nullable: true })
  public nikName!: User['nikName'];

  @ApiProperty({ type: String, nullable: true })
  public phone!: User['phone'];

  @ApiProperty({ type: number, nullable: false })
  public role!: User['role'];
}
