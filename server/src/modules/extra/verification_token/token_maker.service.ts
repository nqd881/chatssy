import { Injectable } from '@nestjs/common';
import crypto from 'crypto';

@Injectable()
export class CVTTokenMaker {
  randomNumbers(length: number) {
    const characters = '0123456789';
    let result = '';

    for (let i = 1; i <= length; i++) {
      result += Math.floor(Math.random() * characters.length);
    }

    return result;
  }

  randomBytes(size: number) {
    return crypto.randomBytes(size).toString('hex');
  }
}
