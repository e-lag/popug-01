import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiOkResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';

import { TaskService } from '../domain/task.service';
import { TaskGetQueryDto, TaskGetResponseDto } from './dtos';

@ApiTags('tasks')
@ApiBearerAuth()
@UseGuards(AuthGuard('mobile-jwt'))
@Controller()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOkResponse({ type: TaskGetResponseDto })
  @Get()
  public async vehicles(
    @Query() query: TaskGetQueryDto,
  ): Promise<TaskGetResponseDto> {
    const { limit, offset } = query;
    const result = await this.taskService.list(limit, offset);
    return {
      data: result[0],
      meta: { total: result[1], limit, offset },
    };
  }
}
