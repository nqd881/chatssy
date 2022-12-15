import { DbUser, DbUserModel } from '@dbmodels/user2/user.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestgoose';
import { CreateUserArgs } from './types/create';

@Injectable()
export class UserDbService {
  constructor(@InjectModel(DbUser) private userModel: DbUserModel) {}

  new(args: CreateUserArgs) {
    const { firstName, lastName, gender, birthDate, address } = args;

    return new this.userModel({
      firstName,
      lastName,
      gender,
      birthDate,
      address,
    });
  }

  async create(args: CreateUserArgs) {
    return this.new(args).save();
  }

  async getOne(userId: string) {
    return this.userModel.findById(userId);
  }

  async getMany(userIds: string[]) {
    return this.userModel.find({ _id: userIds });
  }

  async update() {}

  async updateProfile() {}

  async updatePhoto() {}

  async updateStatus() {}
}
