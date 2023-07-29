import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

import { Match } from '../infrastructure/validators';

export class RegisterRequestDto {
  @ApiProperty({ name: 'email' })
  @IsEmail()
  public email!: string;

  @ApiProperty({ name: 'password' })
  @IsStrongPassword()
  @IsString()
  public password!: string;

  @ApiProperty({
    name: 'passwordConfirm',
    description: 'password confirmation',
  })
  @IsStrongPassword()
  @IsString()
  @Match('password', { message: 'password not match' })
  public passwordConfirm!: string;

  @ApiProperty({ name: 'deviceId' })
  @IsString()
  public deviceId!: string;
}
