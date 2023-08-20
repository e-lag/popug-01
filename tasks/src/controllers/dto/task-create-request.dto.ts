import { ApiProperty } from '@nestjs/swagger';

export class TaskCreateRequestDto {
  @ApiProperty()
  public title: string;
  @ApiProperty()
  public description: string;
}
