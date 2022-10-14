import { EjsTemplate } from '@modules/extra/models/ejs-template.model';
import { DynamicModule, Module } from '@nestjs/common';
import { toArray } from '@utils';
import * as fs from 'fs';
import { NestgooseModule } from 'nestgoose';
import * as path from 'path';
import { EjsTemplateService } from './ejs_template.service';
import { EjsTemplateMap, EJS_INTERNAL_TEMPLATES } from './others';

@Module({
  imports: [NestgooseModule.forFeature([EjsTemplate])],
  providers: [EjsTemplateService],
  exports: [EjsTemplateService],
})
export class EjsTemplateModule {
  static internalTemplates: EjsTemplateMap = {};
  static fileResolved = [];

  static resultModule(): DynamicModule {
    return {
      module: EjsTemplateModule,
      providers: [
        {
          provide: EJS_INTERNAL_TEMPLATES,
          useValue: this.internalTemplates,
        },
      ],
      exports: [EJS_INTERNAL_TEMPLATES],
    };
  }

  static registerFolders(templateFolderPaths: string | string[]) {
    templateFolderPaths = toArray(templateFolderPaths);

    for (let templateFolderPath of templateFolderPaths) {
      this.loadTemplateFolder(templateFolderPath);
    }

    return this.resultModule();
  }

  static registerFiles(templateFilePaths: string | string[]) {
    templateFilePaths = toArray(templateFilePaths);

    for (let templateFilePath of templateFilePaths) {
      this.loadTemplateFile(templateFilePath);
    }

    return this.resultModule();
  }

  static loadTemplateFolder(templateFolderPath: string) {
    const templateFilePaths =
      this.resolveTemplateFilePathInFolder(templateFolderPath);

    this.registerFiles(templateFilePaths);
  }

  static loadTemplateFile(templateFilePath: string) {
    if (!this.isTemplateFile(templateFilePath)) return;
    if (this.fileIsResolved(templateFilePath)) return;

    const { name } = path.parse(templateFilePath);
    if (this.internalTemplates[name] && this.internalTemplates[name].value)
      throw new Error(
        `Template ${name} is existed. Rename the file to be unique !!!`,
      );

    const templateString = fs.readFileSync(templateFilePath).toString();
    this.internalTemplates[name] = {
      name,
      value: EjsTemplateService.minifyTemplate(templateString),
    };
    this.fileResolved.push(templateFilePath);
  }

  static resolveTemplateFilePathInFolder(templateFolderPath: string) {
    return fs
      .readdirSync(templateFolderPath)
      .filter((fileName) => this.isTemplateFile(fileName))
      .map((fileName) =>
        this.buildTemplateFilePath(templateFolderPath, fileName),
      );
  }

  static buildTemplateFilePath(folderPath: string, fileName: string) {
    return `${folderPath}/${fileName}`;
  }

  static isTemplateFile(fileName: string) {
    return fileName.endsWith('.ejs');
  }

  static fileIsResolved(filePath: string) {
    return this.fileResolved.includes(filePath);
  }
}
