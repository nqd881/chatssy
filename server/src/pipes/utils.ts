import { TfaCodeTypes } from '@modules/main/tfa_process/types2';
import Joi from 'joi';

export const tfaSchema = Joi.object({
  type: Joi.string()
    .valid(...Object.values(TfaCodeTypes))
    .required(),
  code: Joi.string().required(),
});

export const createBodySchema = (payloadSchema: Joi.AnySchema) => {
  return Joi.object({
    payload: payloadSchema,
    tfa: tfaSchema,
  });
};
