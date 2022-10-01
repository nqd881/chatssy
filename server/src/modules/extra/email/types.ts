import { Data } from 'ejs';
import { MailOptions } from 'nodemailer/lib/json-transport';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export const GOOGLE_MAILER_CLIENT = 'GOOGLE_MAILER_CLIENT';

export interface InternalTemplateConstructor<T> {
  new (data: T): InternalTemplate<T>;
}

export class InternalTemplate<T> {
  constructor(public data: T) {}
}

export type TemplateSender<T extends Data> = (
  data: T,
  options: MailOptions,
) => Promise<SMTPTransport.SentMessageInfo>;
