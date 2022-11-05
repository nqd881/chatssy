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
import { CookieAuthGuard } from 'src/guards';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login';
import { LoginWithGoogleDto } from './dto/login-google';

@ApiTags(ChatssyApiTags.Auth)
@Controller('auth')
export class AuthController {
  constructor(
    @InjectConnection() private connection: Connection,
    private service: AuthService,
  ) {}

  @Post('login')
  login(@Req() req: Request, @Res() res: Response, @Body() dto: LoginDto) {
    return this.service.login(req, res, dto);
  }

  @Post('login_google')
  loginGoogle(
    @Req() req: Request,
    @Res() res: Response,
    @Body() dto: LoginWithGoogleDto,
  ) {
    return this.service.loginWithGoogle(req, res, dto.token);
  }

  @Get('me')
  @UseGuards(CookieAuthGuard)
  me(@Req() req: Request) {
    return this.service.detectMe(req);
  }

  @Get('logout')
  @UseGuards(CookieAuthGuard)
  logout(@Req() req: Request, @Res() res: Response) {
    return this.service.logout(req, res);
  }
}
