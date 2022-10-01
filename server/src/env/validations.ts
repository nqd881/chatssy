import { plainToClass } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
  validateSync,
} from 'class-validator';
import { Env } from './types';

export enum NodeEnvironment {
  DEV = 'dev',
  PROD = 'prod',
  TEST = 'test',
  DEBUG = 'debug',
}

export class ChatssyEnv {
  @IsEnum(NodeEnvironment)
  [Env.NODE_ENV]: NodeEnvironment;

  @IsString()
  [Env.COOKIE_SECRET]: string;

  @IsString()
  [Env.CSRF_TOKEN_SECRET]: string;

  @IsString()
  [Env.MONGO_URI]: string;

  @IsString()
  [Env.REDIS_HOST]: string;

  @IsNumber()
  [Env.REDIS_PORT]: number;

  @IsString()
  [Env.PASSWORD_SALT_ROUNDS]: string;

  @IsString()
  [Env.GOOGLE_CLIENT_ID]: string;

  @IsString()
  [Env.GOOGLE_CLIENT_SECRET]: string;

  @IsEmail()
  [Env.GOOGLE_ADMIN_EMAIL_ADDRESS]: string;

  @IsString()
  [Env.GOOGLE_MAILER_REFRESH_TOKEN]: string;

  @IsString()
  [Env.OTP_SALT]: string;

  @IsString()
  [Env.TOKEN_SECRET]: string;
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
