import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { RolesGuard } from './roles.guard';

export * from './auth.guard';
export * from './roles.guard';

export const UseSessionAuthGuard = UseGuards(AuthGuard, RolesGuard);
