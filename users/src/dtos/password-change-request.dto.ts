import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PasswordChangeRequestDto {
  @ApiProperty()
  @IsString()
  public passwordCurrent!: string;

  @ApiProperty()
  @IsString()
  // @IsStrongPassword()
  public passwordNew!: string;

  @ApiProperty({
    name: 'passwordConfirm',
    description: 'password confirmation',
  })
  @IsString()
  // @IsStrongPassword()
  // @Match('passwordNew', { message: 'password not match' })
  public passwordNewConfirm!: string;
}
