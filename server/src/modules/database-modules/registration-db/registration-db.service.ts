import {
  DbRegistration,
  DbRegistrationModel,
  DbRegistrationStatus,
} from '@dbmodels/user2/registration.model';
import { Injectable } from '@nestjs/common';
import { flattenToDotObject } from '@utils';
import { InjectModel } from 'nestgoose';
import { CreateRegistrationArgs } from './types/create.';
import { UpdateRegistrationQuery } from './types/update';

@Injectable()
export class RegistrationDbService {
  constructor(
    @InjectModel(DbRegistration) private registrationModel: DbRegistrationModel,
  ) {}

  new(args: CreateRegistrationArgs) {
    const {
      userId,
      accountId,
      tokenId,
      emailAddress,
      redirectUrlOnSuccess,
      redirectUrlOnFailure,
    } = args;

    return new this.registrationModel({
      userId,
      accountId,
      tokenId,
      emailAddress,
      status: DbRegistrationStatus.PENDING,
      urlRedirections: {
        success: redirectUrlOnSuccess,
        failure: redirectUrlOnFailure,
      },
    });
  }

  create(args: CreateRegistrationArgs) {
    return this.new(args).save();
  }

  findById(registrationId: string) {
    return this.registrationModel.findById(registrationId);
  }

  // Just update pending registration
  async update(registrationId: string, query: UpdateRegistrationQuery) {
    const updateQuery = flattenToDotObject(query);

    return this.registrationModel.findOneAndUpdate(
      { _id: registrationId, status: DbRegistrationStatus.PENDING },
      updateQuery,
      { new: true },
    );
  }

  async updateStatus(registrationId: string, newStatus: DbRegistrationStatus) {
    return this.update(registrationId, { status: newStatus });
  }

  async updateTokenId(registrationId: string, newTokenId: string) {
    return this.update(registrationId, { tokenId: newTokenId });
  }
}
