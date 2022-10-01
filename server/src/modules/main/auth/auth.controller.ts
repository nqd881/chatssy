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
import { ChatssyReq, ChatssyRes } from '@types';
import { Connection } from 'mongoose';
import { ChatssyApiTags } from 'src/constant/docs';
import { AuthGuard } from 'src/guards';
import { AuthService } from './auth.service';
import { LoginReqBody, LoginWithGoogleReqBody } from './validations';

@ApiTags(ChatssyApiTags.Auth)
@Controller('auth')
export class AuthController {
  constructor(
    @InjectConnection() private connection: Connection,
    private service: AuthService,
  ) {}

  @Post('login')
  login(
    @Req() req: ChatssyReq,
    @Res() res: ChatssyRes,
    @Body() { payload }: LoginReqBody,
  ) {
    return this.service.login(req, res, payload);
  }

  @Post('login_google')
  loginGoogle(
    @Req() req: ChatssyReq,
    @Res() res: ChatssyRes,
    @Body() { payload }: LoginWithGoogleReqBody,
  ) {
    return this.service.loginWithGoogle(req, res, payload.token);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  me(@Req() req: ChatssyReq) {
    return this.service.detectMe(req);
  }

  @Get('logout')
  @UseGuards(AuthGuard)
  logout(@Req() req: ChatssyReq) {
    return this.service.logout(req);
  }
}
