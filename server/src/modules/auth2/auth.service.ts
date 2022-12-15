import { Token } from '@constant';
import { DbTokenDoc } from '@dbmodels/token.model';
import {
  DbRegistrationDoc,
  DbRegistrationStatus,
} from '@dbmodels/user2/registration.model';
import { DbUserAccountTypes } from '@dbmodels/user2/user-account.model';
import { RegistrationDbService } from '@modules/database-modules/registration-db/registration-db.service';
import {
  TokenDbService,
  VerifyTokenResult,
} from '@modules/database-modules/token-db/token-db.service';
import { UserAccountDbService } from '@modules/database-modules/user-account-db/user-account-db.service';
import { UserDbService } from '@modules/database-modules/user-db/user-db.service';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import URI from 'urijs';
import { ActivateArgs } from './types/activate';
import { RegisterArgs } from './types/register';

@Injectable()
export class AuthService {
  constructor(
    private userDbService: UserDbService,
    private userAccountDbService: UserAccountDbService,
    private registrationDbService: RegistrationDbService,
    private tokenDbService: TokenDbService,
    private mailerService: MailerService,
  ) {}

  private createRegistrationToken() {
    return this.tokenDbService.create({
      name: Token.REGISTRATION,
      time: '3h',
    });
  }

  async registerUserAccount(args: RegisterArgs) {
    const user = await this.userDbService.create(args);

    const userAccount = await this.userAccountDbService.create({
      ...args,
      userId: user.id,
      type: DbUserAccountTypes.FREE,
    });

    const token = await this.createRegistrationToken();

    const registration = await this.registrationDbService.create({
      ...args,
      userId: user.id,
      accountId: userAccount.id,
      tokenId: token.id,
      emailAddress: userAccount.mainEmail.emailAddress,
    });

    this.sendRegistrationEmail(registration, token);

    return registration;
  }

  sendRegistrationEmail(registration: DbRegistrationDoc, token: DbTokenDoc) {
    const { code } = token;
    const {
      id: registrationId,
      emailAddress,
      urlRedirections: {
        success: redirectUrlOnSuccess,
        failure: redirectUrlOnFailure,
      },
    } = registration;

    const uri = new URI(
      `http://localhost:3000/auth2/registrations/${registrationId}/activate`,
    ).query({
      code,
      redirect_url_success: redirectUrlOnSuccess,
      redirect_url_failure: redirectUrlOnFailure,
    });

    return this.mailerService.sendMail({
      to: emailAddress,
      subject: 'Continue signing up',
      template: 'registration',
      // context: { url: uri },
      context: {
        registrationId,
        code,
        redirectUrlOnSuccess,
        redirectUrlOnFailure,
      },
    });
  }

  async resendRegistrationEmail(registrationId: string) {
    const registration = await this.registrationDbService.findById(
      registrationId,
    );

    if (!registration) return null;

    const token = await this.tokenDbService.findUnlockedById(
      registration.tokenId.toString(),
    );

    if (!token) return null;

    this.sendRegistrationEmail(registration, token);

    return registration;
  }

  async activateUserAccount(args: ActivateArgs) {
    const { registrationId, code } = args;

    const registration = await this.registrationDbService.findById(
      registrationId,
    );

    if (registration.status !== DbRegistrationStatus.PENDING) return false;

    const verifyTokenResult = await this.tokenDbService.verify(
      registration.tokenId.toString(),
      code,
    );

    if (verifyTokenResult === VerifyTokenResult.VALID) {
      await this.userAccountDbService.activateByEmail(
        registration.accountId.toString(),
      );

      this.registrationDbService.updateStatus(
        registration.id,
        DbRegistrationStatus.SUCCESSFUL,
      );

      return true;
    }

    if (
      verifyTokenResult === VerifyTokenResult.NOT_FOUND ||
      verifyTokenResult === VerifyTokenResult.LOCKED ||
      verifyTokenResult === VerifyTokenResult.EXPIRED
    ) {
      this.registrationDbService.updateStatus(
        registration.id,
        DbRegistrationStatus.FAILED,
      );
    }

    return false;
  }
}
