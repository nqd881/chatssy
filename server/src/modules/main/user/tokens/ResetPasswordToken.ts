import { CVT } from '@modules/extra/verification_token';
import { CVTTokenMaker } from '@modules/extra/verification_token/token_maker.service';

export class ResetPasswordToken extends CVT {
  type = 'RESET_PASSWORD';
  time = '1h';
  makeToken(defaultMaker: CVTTokenMaker) {
    return defaultMaker.randomBytes(64);
  }
}
