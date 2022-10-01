import { Module } from '@nestjs/common';
import {
  AsyncModelFactory,
  ModelDefinition,
  MongooseModule,
} from '@nestjs/mongoose';
import { isString } from 'class-validator';
import { DatabaseService } from './database.service';
import {
  ChatMD,
  EjsTemplateMD,
  FileMD,
  MessageBucketMD,
  MessageMD,
  VerificationTokenMD,
  TfaProcessMD,
  UserModelFactory,
} from './schemas';
import { ModelName } from './types';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {
  private static modelDefinitions: ModelDefinition[] = [
    VerificationTokenMD,
    EjsTemplateMD,
    ChatMD,
    MessageBucketMD,
    MessageMD,
    FileMD,
    TfaProcessMD,
  ];
  private static modelFactories: AsyncModelFactory[] = [UserModelFactory];

  private static isModelDefinition(name: string) {
    return this.modelDefinitions.some((model) => model.name === name);
  }

  private static isModelFactory(name: string) {
    return this.modelFactories.some((factory) => factory.name === name);
  }

  private static getModels<T extends ModelDefinition | AsyncModelFactory>(
    collections: T[],
    names: string[],
  ) {
    return collections.filter((model) => names.includes(model.name));
  }

  private static getDefinitionModels(names: string[]) {
    return this.getModels(this.modelDefinitions, names);
  }

  private static getFactoryModels(names: string[]) {
    return this.getModels(this.modelFactories, names);
  }

  private static isValidName(name: string) {
    return !(this.isModelDefinition(name) == this.isModelFactory(name));
  }

  private static checkName(name: string) {
    if (!this.isValidName(name))
      throw Error(`Model with name '${name}' is invalid.`);
  }

  private static resolveModelName(modelName: ModelName) {
    const name = isString(modelName) ? modelName : modelName.name;
    this.checkName(name);
    return name;
  }

  private static resolveModelNames(modelNames: ModelName[]) {
    return modelNames.map((modelName) => this.resolveModelName(modelName));
  }

  private static classifyNames(names: string[]) {
    const definitions = names.filter((name) => this.isModelDefinition(name));
    const factories = names.filter((name) => this.isModelFactory(name));

    return { definitions, factories };
  }

  static use(...modelNames: ModelName[]) {
    const names = this.resolveModelNames(modelNames);
    const { definitions, factories } = this.classifyNames(names);

    return [
      DatabaseModule,
      MongooseModule.forFeature(this.getDefinitionModels(definitions)),
      MongooseModule.forFeatureAsync(this.getFactoryModels(factories)),
    ];
  }
}
