import { User, UserModel } from '@modules/extra/models/user/user.model';
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
}
