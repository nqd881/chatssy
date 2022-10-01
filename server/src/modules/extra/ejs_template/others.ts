import { EjsTemplate } from '@schemas';

export const EJS_INTERNAL_TEMPLATES = 'EJS_INTERNAL_TEMPLATES';

export type EjsTemplateMap = {
  [key: string]: EjsTemplate;
};

export type EjsTemplateFnMap = {
  [key: string]: ejs.TemplateFunction;
};
