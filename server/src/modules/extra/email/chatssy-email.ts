import { Data } from 'ejs';
import { MailOptions } from 'nodemailer/lib/json-transport';
import { InternalTemplateConstructor } from './types';

export class ChatssyEmail<D extends Data = {}> {
  data: D;

  constructor(
    public options: MailOptions,
    public template?: InternalTemplateConstructor<D>,
  ) {}

  bind(data: D) {
    this.data = { ...this.data, ...data };
    return this;
  }
}
