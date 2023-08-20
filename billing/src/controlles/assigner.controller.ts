import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthRequest } from '../infrastructure/auth/types/auth.request.type';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller()
export class AssignerController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('balance')
  balanceGet(@Req() { user }: AuthRequest) {}
}
