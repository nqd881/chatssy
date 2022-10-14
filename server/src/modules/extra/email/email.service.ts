import { EjsTemplateService } from '@modules/main/ejs-template';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { isString } from 'class-validator';
import { Data } from 'ejs';
import * as nodemailer from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';
import { Env } from 'src/env/types';
import { ChatssyEmail } from './chatssy-email';
import { InternalTemplateConstructor, TemplateSender } from './types';

@Injectable()
export class EmailService {
  @Inject()
  private ejsTemplateService: EjsTemplateService;

  @Inject()
  private envConfig: ConfigService;

  get transporter() {
    return nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: this.envConfig.get(Env.GOOGLE_ADMIN_EMAIL_ADDRESS),
        clientId: this.envConfig.get(Env.GOOGLE_CLIENT_ID),
        clientSecret: this.envConfig.get(Env.GOOGLE_CLIENT_SECRET),
        refreshToken: this.envConfig.get(Env.GOOGLE_MAILER_REFRESH_TOKEN),
      },
    });
  }

  async sendEmail(options: MailOptions) {
    return this.transporter.sendMail(options);
  }

  resolveTemplateName<T>(
    templateClassOrName: InternalTemplateConstructor<T> | string,
  ) {
    return isString(templateClassOrName)
      ? templateClassOrName
      : templateClassOrName.name;
  }

  buildTemplateSender<T = Data>(
    templateClassOrName: InternalTemplateConstructor<T> | string,
  ): TemplateSender<T> {
    return async (data: T, options: MailOptions) => {
      const templateName = this.resolveTemplateName(templateClassOrName);
      const templateFn = await this.ejsTemplateService.get(templateName);

      return this.sendEmail({
        ...options,
        html: templateFn(data),
      });
    };
  }

  send<D = any>(email: ChatssyEmail<D>) {
    if (email.template) {
      const sender = this.buildTemplateSender(email.template);
      return sender(email.data, email.options);
    }

    return this.sendEmail(email.options);
  }
}
