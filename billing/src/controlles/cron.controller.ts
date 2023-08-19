import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BalanceQuery } from '../application-service/queries/balance/balance.query';
import { AuthRequest } from '../infrastructure/auth/types/auth.request.type';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller()
export class AssignerController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('balance')
  async balanceGet(@Req() { user }: AuthRequest) {
    return this.queryBus.execute(new BalanceQuery(user.id));
  }
}
