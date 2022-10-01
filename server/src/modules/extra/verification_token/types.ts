import { VerificationTokenDocument } from '@schemas';
import { CVTTokenMaker } from './token_maker.service';

// Chatssy Verification Token
// export interface CVT {
//   readonly type: string;
//   readonly time: string | number;
//   makeToken(defaultMaker?: CVTTokenMaker): string;
// }

export abstract class CVT {
  abstract type: string;
  abstract time: string | number;
  abstract makeToken(defaultMaker?: CVTTokenMaker): string;
}

export type CVTCreator = (userId: string) => Promise<string>;

export type CVTVerifier = (
  userId: string,
  tokenValue: string,
) => Promise<VerificationTokenDocument> | null;

export type CVTPair = {
  create: CVTCreator;
  verify: CVTVerifier;
};

export type CVTConstructor = new () => CVT;
