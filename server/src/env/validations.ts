import { plainToClass } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
  validateSync,
} from 'class-validator';
import { IsStringOrNumber } from 'src/decorators/validator/is-string-or-number.decorator';
import { Env } from './types';

export enum NodeEnvironment {
  DEV = 'dev',
  PROD = 'prod',
  TEST = 'test',
  DEBUG = 'debug',
}

export class ChatssyEnv {
  @IsString()
  [Env.DOMAIN]: string;

  @IsEnum(NodeEnvironment)
  [Env.NODE_ENV]: NodeEnvironment;

  @IsString()
  [Env.SESSION_SECRET]: string;

  @IsStringOrNumber()
  [Env.SESSION_MAX_AGE]: string | number;

  @IsString()
  [Env.MONGO_URI]: string;

  @IsString()
  [Env.REDIS_HOST]: string;

  @IsNumber()
  [Env.REDIS_PORT]: number;

  @IsNumber()
  [Env.PASSWORD_SALT_ROUNDS]: number;

  @IsString()
  [Env.GOOGLE_CLIENT_ID]: string;

  @IsString()
  [Env.GOOGLE_CLIENT_SECRET]: string;

  @IsEmail()
  [Env.GOOGLE_ADMIN_EMAIL_ADDRESS]: string;

  @IsString()
  [Env.GOOGLE_MAILER_REFRESH_TOKEN]: string;
}

export const validate = (config: Record<string, unknown>) => {
  const validatedConfig = plainToClass(ChatssyEnv, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) throw new Error(errors.toString());
  return validatedConfig;
};
