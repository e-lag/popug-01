import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumberString } from 'class-validator';

export class EmailConfirmRequestBodyDto {
  @ApiProperty({ name: 'email' })
  @IsEmail()
  public email!: string;

  @ApiProperty({ name: 'confirmCode' })
  @IsNumberString()
  public confirmCode!: string;
}
