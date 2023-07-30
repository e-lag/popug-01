import { ApiProperty } from '@nestjs/swagger';

export class IdentifiedDto {
  @ApiProperty()
  public createdAt!: Date;

  @ApiProperty()
  public id!: string;

  @ApiProperty()
  public updatedAt!: Date;
}
