import { ApiProperty } from '@nestjs/swagger';

export class TaskCreateRequestDto {
  @ApiProperty()
  public title: string;
  @ApiProperty()
  public jiraId?: string;
  @ApiProperty()
  public description: string;
}
