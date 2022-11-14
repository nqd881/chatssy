import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Connection } from 'mongoose';
import { ChatssyApiTags } from 'src/constant/docs';
import { Session } from 'src/decorators/session.decorator';
import { CookieAuthGuard } from 'src/guards';
import { SessionUserData } from '../session';
import { ApiPayloadLogin } from './api/login';
import { AuthService } from './auth.service';

@ApiTags(ChatssyApiTags.Auth)
@Controller('auth')
export class AuthController {
  constructor(
    @InjectConnection() private connection: Connection,
    private service: AuthService,
  ) {}

  @Post('login')
  login(
    @Req() req: Request,
    @Res() res: Response,
    @Body() payload: ApiPayloadLogin,
  ) {
    return this.service.login(req, res, payload);
  }

  // @Post('login_google')
  // loginGoogle(
  //   @Req() req: Request,
  //   @Res() res: Response,
  //   @Body() dto: LoginWithGoogleDto,
  // ) {
  //   return this.service.loginWithGoogle(req, res, dto.token);
  // }

  @Get('me')
  @UseGuards(CookieAuthGuard)
  detectMe(@Session('user') user: SessionUserData) {
    return this.service.detectMe(user.id);
  }
  // me(@Req() req: Request) {
  //   return this.service.detectMe(req);
  // }

  @Get('logout')
  @UseGuards(CookieAuthGuard)
  logout(@Req() req: Request, @Res() res: Response) {
    return this.service.logout(req, res);
  }
}
