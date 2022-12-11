import { DbUserAuth } from '@dbmodels/user/user-auth.model';
import { PartialDeep } from 'type-fest';

export type UpdateAuthData = PartialDeep<DbUserAuth>;
