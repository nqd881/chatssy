import { CVT } from '@modules/extra/verification_token';
import { CVTTokenMaker } from '@modules/extra/verification_token/token_maker.service';

export class ConfirmEmailToken extends CVT {
  type = 'CONFIRM_EMAIL';
  time = '10m';
  makeToken(defaultMaker: CVTTokenMaker) {
    return defaultMaker.randomBytes(64);
  }
}
