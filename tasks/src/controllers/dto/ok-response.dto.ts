import { ApiProperty } from '@nestjs/swagger';

export class OkResponseDto {
  @ApiProperty({ default: 'ok' })
  result: 'ok';
}
