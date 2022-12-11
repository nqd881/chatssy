import { Injectable } from '@nestjs/common';
import { newObjectId } from '@utils/mongodb';
import { InjectModel } from 'nestgoose';
import { DbUserChatStates } from 'src/db-models/user/user-chat.model';
import { DbUser, DbUserModel } from 'src/db-models/user/user.model';

@Injectable()
export class UserChatsService {
  constructor(@InjectModel(DbUser) private userModel: DbUserModel) {}

  addChatToMembers(chatId: string, memberIds: string[]) {
    return this.userModel
      .updateMany(
        { _id: memberIds },
        {
          $push: {
            chats: {
              chatId,
              state: DbUserChatStates.STARTED,
            },
          },
        },
      )
      .exec();
  }

  async getAllUserChats(userId: string) {
    const result = await this.userModel.aggregate([
      {
        $match: {
          _id: newObjectId(userId),
        },
      },
      {
        $limit: 1,
      },
      {
        $unwind: '$chats',
      },
      {
        $replaceRoot: {
          newRoot: '$chats',
        },
      },
      {
        $lookup: {
          from: 'dbchats',
          localField: 'chatId',
          foreignField: '_id',
          as: 'details',
        },
      },
      {
        $unwind: '$details',
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ['$details', '$$ROOT'],
          },
        },
      },
      {
        $unset: ['chatId', 'details', 'bucketIds', '__v'],
      },
    ]);

    return result;
  }
}
