import { EjsTemplate, EjsTemplateModel } from '@schemas';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as ejs from 'ejs';
import { minify } from 'html-minifier';
import { EjsTemplateMap, EJS_INTERNAL_TEMPLATES } from './others';

@Injectable()
export class EjsTemplateService {
  @Inject(EJS_INTERNAL_TEMPLATES)
  private internalTemplates: EjsTemplateMap;

  @InjectModel(EjsTemplate.name)
  private ejsTemplateModel: EjsTemplateModel;

  static minifyTemplate(templateString: string) {
    return minify(templateString, {
      collapseWhitespace: true,
      removeComments: true,
    });
  }

  compile = ejs.compile;

  getInternalTemplate(name: string) {
    return this.internalTemplates[name];
  }

  getInternalTemplateFn(name: string) {
    return this.compile(this.getInternalTemplate(name).value);
  }

  async getDbTemplate(name: string): Promise<EjsTemplate> {
    const template = await this.ejsTemplateModel.findOne({ name });
    if (template) return template;

    throw new Error('Not found template');
  }

  async createDbTemplate(name: string, value: string) {
    if (this.internalTemplates[name])
      return this.ejsTemplateModel.create({
        name,
        value: EjsTemplateService.minifyTemplate(value),
      });
  }

  async deleteDbTemplate(name: string) {
    return this.ejsTemplateModel.findOneAndDelete({ name });
  }

  async getTemplate(name: string) {
    return this.getInternalTemplate(name) || this.getDbTemplate(name);
  }

  async get(name: string) {
    const template = await this.getTemplate(name);
    return this.compile(template.value);
  }
}
