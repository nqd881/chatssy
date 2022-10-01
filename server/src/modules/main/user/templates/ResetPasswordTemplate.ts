import { InternalTemplate } from '@modules/extra/email';

export type ResetPasswordTemplateData = {
  url: string;
};

export class ResetPasswordTemplate extends InternalTemplate<ResetPasswordTemplateData> {}
