import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

// import { Match } from '../infrastructure/validators';

export class RegisterRequestDto {
  @ApiProperty({ name: 'email' })
  @IsEmail()
  public email!: string;

  @ApiProperty({ name: 'password' })
  @IsString()
  // @IsStrongPassword()
  public password!: string;

  @ApiProperty({
    name: 'passwordConfirm',
    description: 'password confirmation',
  })
  @IsString()
  // @IsStrongPassword()
  public passwordConfirm!: string;

  @ApiProperty({ name: 'deviceId' })
  @IsString()
  public deviceId!: string;
}
