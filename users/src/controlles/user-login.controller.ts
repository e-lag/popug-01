import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiHeaders,
  ApiTags,
} from '@nestjs/swagger';

import { UserFacade } from '../application-service';
import { AuthRequest } from '../auth/auth.request';
import {
  LoginRequestDto,
  LoginResponseDto,
  RegisterRequestDto,
  RegisterResponseDto,
} from '../dtos';
import { UserErrors } from '../infrastructure/user.errors';

@ApiTags('users')
@Controller('')
export class UserLoginController {
  constructor(private readonly userFacade: UserFacade) {}

  @ApiConflictResponse({ description: UserErrors.EmailIsBusy })
  @ApiBadRequestResponse({ description: 'Other errors' })
  @Post('register')
  private async register(
    @Body() body: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    return this.userFacade
      .register(body.email, body.password, body.passwordConfirm, body.deviceId)
      .catch((err: Error) => {
        if (err.message === UserErrors.EmailIsBusy) {
          throw new HttpException(err.message, HttpStatus.CONFLICT);
        }

        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      });
  }

  @ApiForbiddenResponse({ description: UserErrors.AccountBlocked })
  @ApiBadRequestResponse({ description: 'Other errors' })
  @Post('login')
  private async login(
    @Body() body: LoginRequestDto,
  ): Promise<LoginResponseDto> {
    return this.userFacade
      .login(body.email, body.password)
      .catch((err: Error) => {
        if (err.message === UserErrors.NotFound) {
          throw new HttpException(err.message, HttpStatus.NOT_FOUND);
        }

        if (err.message === UserErrors.AccountBlocked) {
          throw new HttpException(err.message, HttpStatus.FORBIDDEN);
        }

        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      });
  }

  @ApiBearerAuth()
  @ApiHeaders([])
  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  private async logout(@Req() request: AuthRequest): Promise<void> {
    const authorization = (request.headers.Authorization as string) || '';
    const token = authorization.split(' ')[1];
    return this.userFacade.logout(request.user.id, token);
  }
}
