import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Logger,
  NotFoundException,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { TaskCreateCommand } from '../application-service/commands/task-create/task-create.command';
import { TaskQuery } from '../application-service/queries/task/task.query';
import { TasksQuery } from '../application-service/queries/tasks/tasks.query';
import { AuthRequest } from '../infrastructure/auth/types/auth.request.type';
import { TaskCreateRequestDto } from './dto/task-create-request.dto';
import { TaskListResponseDto } from './dto/task-list-response.dto';
import { TaskResponseDto } from './dto/task-response.dto';
import { TasksQueryDto } from './dto/tasks-query.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('')
export class TasksController {
  private _logger = new Logger(TasksController.name);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiResponse({ type: TaskResponseDto })
  @Get('task/:id')
  async taskGet(@Param('id') id: string): Promise<TaskResponseDto> {
    this._logger.debug({ resultId: id });
    return this.queryBus.execute(new TaskQuery(id)).catch((err) => {
      this._logger.debug({ err });
      if (err?.name === 'NotFoundError') {
        throw new NotFoundException();
      }
      throw new BadRequestException();
    });
  }

  @ApiResponse({ type: TaskListResponseDto })
  @Get('')
  async tasksGet(
    @Query() query: TasksQueryDto,
    @Req() { user }: AuthRequest,
  ): Promise<{ tasks: TaskResponseDto[]; count: number }> {
    this._logger.debug({ query, user });
    const tasksResponse = await this.queryBus.execute(new TasksQuery(query));
    return { tasks: tasksResponse[0], count: tasksResponse[1] };
  }

  @ApiResponse({ type: TaskResponseDto, status: 201 })
  @Post('create')
  async taskCreate(
    @Body() taskCreate: TaskCreateRequestDto,
  ): Promise<TaskResponseDto> {
    return this.commandBus.execute(new TaskCreateCommand(taskCreate));
  }
}
