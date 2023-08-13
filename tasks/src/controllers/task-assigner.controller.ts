import { Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { TaskFinishCommand } from '../application-service/commands/task-finish/task-finish.command';
import { AuthRequest } from '../infrastructure/auth/types/auth.request.type';
import { TaskResponseDto } from './dto/task-response.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('')
export class TaskAssignerController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiResponse({ type: TaskResponseDto, status: 200 })
  @Post('finish/:id')
  async taskFinish(
    @Param(':id') id: string,
    @Req() { user }: AuthRequest,
  ): Promise<TaskResponseDto> {
    return this.commandBus.execute(new TaskFinishCommand(id, user));
  }
}
