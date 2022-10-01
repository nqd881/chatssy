import Joi from 'joi';
import { JoiValidationPipe } from 'src/pipes/joi_validation.pipe';

export type RVPOptionsKey = 'body' | 'query' | 'param';

export type RVPOptions = {
  [K in RVPOptionsKey]?: Joi.ObjectSchema;
};

// Request Validation Pipes
export class RVP {
  constructor(private _options: RVPOptions) {}

  get(key: RVPOptionsKey) {
    if (this._options[key]) return new JoiValidationPipe(this._options[key]);
    else return null;
  }
}
