import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiOkResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { AuthRequest } from '@popug/common';

import { AccountService } from '../domain/account.service';
import { TaskGetQueryDto, TaskGetResponseDto } from './dtos';

@ApiTags('tasks')
@ApiBearerAuth()
@UseGuards(AuthGuard('mobile-jwt'))
@Controller()
export class TaskController {
  constructor(private readonly taskService: AccountService) {}

  @ApiOkResponse({ type: TaskGetResponseDto })
  @Get()
  public async list(
    @Query() query: TaskGetQueryDto,
    // @Req() req: AuthRequest,
  ): Promise<TaskGetResponseDto> {
    const { limit, offset } = query;
    const result = await this.taskService.list(limit, offset);
    return {
      data: result[0],
      meta: { total: result[1], limit, offset },
    };
  }

  // @ApiOkResponse({ type: TaskGetResponseDto })
  @Post()
  public async create(@Body() body: unknown, @Req() { user }: AuthRequest): Promise<unknown> {
    const result = await this.taskService.create(body, user);
    return {
      meta: result,
    };
  }

  // @ApiOkResponse({ type: TaskGetResponseDto })
  @Post('assign')
  public async assign(@Query() query: unknown, @Body() body: unknown, @Req() { user }: AuthRequest): Promise<unknown> {
    const result = await this.taskService.assign(query, {
      body,
      user,
    });
    return {
      meta: result,
    };
  }

  // @ApiOkResponse({ type: TaskGetResponseDto })
  @Post('setStatus')
  public async setStatus(
    @Query() query: unknown,
    @Body() body: unknown,
    @Req() { user }: AuthRequest,
  ): Promise<unknown> {
    const result = await this.taskService.statusSet(query, body, user);
    return {
      meta: result,
    };
  }
}
