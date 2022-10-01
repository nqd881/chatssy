import { User, UserModel } from '@modules/extra/database/schemas';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserSearchingService {
  constructor(@InjectModel(User.name) private model: UserModel) {}

  findById(userId: any) {
    return this.model.findById(userId);
  }

  findByEmail(email: string) {
    return this.model.findOne({ email });
  }

  findByUsername(username: string) {
    return this.model.findOne({ 'auth.username': username });
  }
}
