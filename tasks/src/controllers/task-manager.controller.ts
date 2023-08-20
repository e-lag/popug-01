import {
  Controller,
  ForbiddenException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { ReassignTaskCommand } from '../application-service/commands/reassign-task/reassign-task.command';
import { AuthRequest } from '../infrastructure/auth/types/auth.request.type';
import { UserRoles } from '../types/user-roles.enum';
import { OkResponseDto } from './dto/ok-response.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('manager')
export class TaskManagerController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiResponse({ type: OkResponseDto, status: 200 })
  @Post('reassign')
  async reassign(@Req() { user }: AuthRequest): Promise<{ result: 'ok' }> {
    if (![UserRoles.MANAGER, UserRoles.ADMIN].includes(user.role)) {
      throw new ForbiddenException();
    }
    return this.commandBus.execute(new ReassignTaskCommand());
  }
}
