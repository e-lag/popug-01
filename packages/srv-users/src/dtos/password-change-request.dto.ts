import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsStrongPassword } from 'class-validator';

import { Match } from '../infrastructure/validators';

export class PasswordChangeRequestDto {
  @ApiProperty()
  @IsString()
  public passwordCurrent!: string;

  @ApiProperty()
  @IsStrongPassword()
  public passwordNew!: string;

  @ApiProperty({
    name: 'passwordConfirm',
    description: 'password confirmation',
  })
  @IsStrongPassword()
  @IsString()
  @Match('passwordNew', { message: 'password not match' })
  public passwordNewConfirm!: string;
}
