// import { Body } from '@nestjs/common';

import { Body } from '@nestjs/common';

export type BodyDiscriminatorOptions = {};

export const BodyDiscriminator = (options: BodyDiscriminatorOptions) => {
  return Body();
};
