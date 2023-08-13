import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty()
  @IsEmail()
  public email!: string;

  @ApiProperty()
  @IsString()
  public password!: string;

  @ApiProperty()
  @IsString()
  public deviceId!: string;
}
