import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class NikNameChangeRequestBodyDto {
  @ApiProperty()
  @IsString()
  public nikName!: string;
}
