import { Type } from '@nestjs/common';
import { SchemaFactory } from '@nestjs/mongoose';

export const buildModuleDefinition = <TClass>(
  schemaClassTarget: Type<TClass>,
) => {
  const schema = SchemaFactory.createForClass(schemaClassTarget);
  const moduleDefinition = {
    name: schemaClassTarget.name,
    schema,
  };

  return {
    schema,
    moduleDefinition,
  };
};
