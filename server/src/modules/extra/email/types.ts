import { Data } from 'ejs';
import { MailOptions } from 'nodemailer/lib/json-transport';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

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
