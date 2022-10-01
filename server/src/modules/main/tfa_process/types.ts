export enum TfaProcessTypes {
  EMAIL = 'Tfa_email',
  SMS = 'Tfa_sms',
  APP = 'Tfa_app',
  BACKUP_CODE = 'Tfa_backup_code',
}

export abstract class TfaProcessEntity {
  abstract type: TfaProcessTypes;
  abstract process_name: string;
  abstract time: string | number;
  abstract limit: number;

  constructor(public user_id: string) {}

  abstract getCode(): string;
  abstract verifyCode(code: string): boolean;
}

export abstract class TfaEmailProcess extends TfaProcessEntity {
  type = TfaProcessTypes.EMAIL;

  getCode() {
    return 'code_generated_for_email';
  }

  verifyCode(code: string) {
    return true;
  }
}

export abstract class TfaAppProcess extends TfaProcessEntity {
  type = TfaProcessTypes.APP;

  getCode() {
    return 'code_generated_for_app';
  }

  verifyCode(code: string) {
    return false;
  }
}

export class ChangePasswordByEmailProcess extends TfaEmailProcess {
  process_name = 'CHANGE_PASSWORD_BY_EMAIL';
  limit = 5;
  time = '10m';
}

export class ChangePasswordByAppProcess extends TfaAppProcess {
  process_name: 'CHANGE_PASSWORD_BY_APP';
  limit: 10;
  time: 30;
}

export class VerifyUserByEmailProcess extends TfaEmailProcess {
  process_name = 'VERIFY_USER_BY_EMAIL';
  limit = null;
  time = '30m';
}

const process = new ChangePasswordByEmailProcess('631f416e5b7f45433e29004f');

const verifyProcess = (options: { process_id: string; code: string }) => {};

export type ChatssyEmailProcess =
  | ChangePasswordByEmailProcess
  | VerifyUserByEmailProcess;
export type ChatssyAppProcess = ChangePasswordByAppProcess;

export type ChatssyProcess = ChatssyEmailProcess | ChatssyAppProcess;
