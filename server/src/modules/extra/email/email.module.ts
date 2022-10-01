import { EjsTemplateModule } from '@modules/extra/ejs_template';
import { Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { Env } from 'src/env/types';
import { EmailService } from './email.service';
import { GOOGLE_MAILER_CLIENT } from './types';

const GoogleMailerClient: Provider = {
  provide: GOOGLE_MAILER_CLIENT,
  inject: [ConfigService],
  useFactory: (envConfig: ConfigService) => {
    const client = new OAuth2Client(
      envConfig.get(Env.GOOGLE_CLIENT_ID),
      envConfig.get(Env.GOOGLE_CLIENT_SECRET),
    );

    client.setCredentials({
      refresh_token: envConfig.get(Env.GOOGLE_MAILER_REFRESH_TOKEN),
    });
    return client;
  },
};

@Module({
  imports: [EjsTemplateModule.resultModule(), ConfigModule],
  providers: [EmailService, GoogleMailerClient],
  exports: [EmailService],
})
export class EmailModule {}
