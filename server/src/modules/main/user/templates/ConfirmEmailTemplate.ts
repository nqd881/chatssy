import { InternalTemplate } from '@modules/extra/email';

export type ConfirmEmailTemplateData = {
  url: string;
};

export class ConfirmEmailTemplate extends InternalTemplate<ConfirmEmailTemplateData> {}
