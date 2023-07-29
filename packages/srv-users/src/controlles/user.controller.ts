import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiOkWrappedResponse } from '@popug/utils-common';

import { UserFacade } from '../application-service';
import { UserProfileDto } from '../dtos';
import { EmailChangeRequestBodyDto } from '../dtos/email-change-request-body.dto';
import { EmailConfirmRequestBodyDto } from '../dtos/email-confirm-request-body.dto';
import { EmptyResponseDto } from '../dtos/empty-response.dto';
import { NikNameChangeRequestBodyDto } from '../dtos/nik-name-change-request-body.dto';
import { PasswordChangeRequestDto } from '../dtos/password-change-request.dto';
import { AuthRequest } from '../infrastructure/auth/auth.request';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(AuthGuard('mobile-jwt'))
@Controller('')
export class UserController {
  constructor(private readonly userFacade: UserFacade) {}

  @ApiOkWrappedResponse(UserProfileDto)
  @Get('profile')
  private async profileGet(
    @Req() request: AuthRequest,
  ): Promise<UserProfileDto> {
    return this.userFacade.profile(request.user);
  }

  @ApiOkWrappedResponse(EmptyResponseDto)
  @Post('emailConfirm')
  private async emailConfirm(
    @Req() request: AuthRequest,
    @Body() body: EmailConfirmRequestBodyDto,
  ): Promise<void> {
    return this.userFacade
      .emailConfirm(request.user, body.email, body.confirmCode)
      .catch((err: Error) => {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      });
  }

  @ApiOkWrappedResponse(EmptyResponseDto)
  @Post('emailChange')
  private async emailChange(
    @Req() request: AuthRequest,
    @Body() body: EmailChangeRequestBodyDto,
  ): Promise<void> {
    return this.userFacade
      .emailChange(request.user, body.email)
      .catch((err: Error) => {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      });
  }

  @ApiOkWrappedResponse(EmptyResponseDto)
  @Post('nikNameChange')
  private async nikNameChange(
    @Req() request: AuthRequest,
    @Body() body: NikNameChangeRequestBodyDto,
  ): Promise<void> {
    return this.userFacade
      .nikNameChange(request.user, body.nikName)
      .catch((err: Error) => {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      });
  }

  @ApiOkWrappedResponse(EmptyResponseDto)
  @Post('passwordChange')
  private async passwordChange(
    @Req() request: AuthRequest,
    @Body() body: PasswordChangeRequestDto,
  ): Promise<void> {
    return this.userFacade
      .changePassword(
        request.user,
        body.passwordCurrent,
        body.passwordNew,
        body.passwordNewConfirm,
      )
      .catch((err: Error) => {
        throw new HttpException(err.message, HttpStatus.OK);
      });
  }
}
