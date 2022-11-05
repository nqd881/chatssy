import {
  User,
  UserDoc,
  UserModel,
} from '@modules/extra/models/user/user.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestgoose';

@Injectable()
export class UserSearchingService {
  constructor(@InjectModel(User) private model: UserModel) {}

  findById(userId: any) {
    return this.model.findById(userId);
  }

  findByEmail(email: string) {
    return this.model.findOne({ 'email.address': email });
  }

  findByUsername(username: string) {
    return this.model.findOne({ 'auth.username': username });
  }

  async fetchUserById(arg: string | UserDoc): Promise<UserDoc> {
    if (typeof arg === 'string') {
      let id = arg;
      return this.findById(id).exec();
    }

    return arg;
  }
}
