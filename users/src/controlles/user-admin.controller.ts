import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserRoleChangeCommand } from '../application-service/commands/user-role-change/user-role-change.command';
import { ProfileQuery } from '../application-service/query/profile/profile.query';
import { UsersQuery } from '../application-service/query/users/users.query';
import { UserProfileDto } from '../dtos';
import { Roles } from '../infrastructure/guards/user-role.decorator';
import { UserRoles } from '../types/user-roles.enum';

@ApiTags('admin')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
// Разрешено только пользователем с ролью ADMIN
@Roles(UserRoles.ADMIN)
@Controller('admin')
export class UserAdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  // Список пользователей
  @Get('users')
  public async usersGet(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('offset', ParseIntPipe) offset: number,
  ): Promise<UserProfileDto> {
    return this.queryBus.execute(new UsersQuery(limit, offset));
  }

  // данные пользователя
  @Get('user/:id')
  public async userGet(@Param('id') userId: string): Promise<UserProfileDto> {
    return this.queryBus.execute(new ProfileQuery(userId));
  }

  // Изменить роль пользователя
  @Post('user/:id/role')
  public async setRole(
    @Param('id') userId: string,
    @Body('role') role: UserRoles,
  ): Promise<void> {
    return this.commandBus.execute(new UserRoleChangeCommand(userId, role));
  }
}
