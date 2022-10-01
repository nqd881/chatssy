import { UserRoles } from '@schemas';
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: UserRoles[]) => SetMetadata('roles', roles);
