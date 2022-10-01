import { UnauthorizedException } from '@nestjs/common';

export const WrongCredentials = new UnauthorizedException('Wrong credentials');
