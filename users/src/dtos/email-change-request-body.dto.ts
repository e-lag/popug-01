import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class EmailChangeRequestBodyDto {
  @ApiProperty({ name: 'email' })
  @IsEmail()
  public email!: string;
}
