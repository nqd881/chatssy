import { UserChatStates } from '@modules/extra/models/user/user-chat.model';
import { User, UserModel } from '@modules/extra/models/user/user.model';
import { Injectable } from '@nestjs/common';
import { toArray } from '@utils';
import mongoose from 'mongoose';
import { InjectModel } from 'nestgoose';
import { UpdateUserChatData } from './data-types';
import { UserChatDetails } from './return-types';

export type GetUserChatsOptions = {
  states?: UserChatStates[];
  ids?: string[];
};

@Injectable()
export class UserChatsService {
  constructor(@InjectModel(User) private model: UserModel) {}

  addChatToMembers(chatId: string, memberIds: string[]) {
    const updateQuery = {
      $push: {
        chats: {
          chat_id: chatId,
          state: UserChatStates.STARTED,
        },
      },
    };

    return this.model.updateMany({ _id: memberIds }, updateQuery).exec();
  }

  async getUserChats(userId: string, options?: GetUserChatsOptions) {
    const defaultStates = Object.keys(UserChatStates);
    const states = options?.states ? toArray(options.states) : defaultStates;
    const ids = options?.ids
      ? options.ids.map((id) => new mongoose.Types.ObjectId(id))
      : undefined;

    const { result } = (
      await this.model
        .aggregate()
        .match({ _id: new mongoose.Types.ObjectId(userId) })
        .lookup({
          from: 'chats',
          let: {
            chat_ids: '$chats.chat_id',
            provided_ids: ids ?? '$chats.chat_id',
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $in: ['$_id', '$$chat_ids'] },
                    { $in: ['$_id', '$$provided_ids'] },
                  ],
                },
              },
            },
          ],
          as: 'resolved_chats',
        })
        .addFields({
          resolved_chats: {
            $map: {
              input: '$resolved_chats',
              as: 'chat',
              in: {
                $mergeObjects: [
                  {
                    $arrayElemAt: [
                      {
                        $filter: {
                          input: '$chats',
                          cond: {
                            $eq: ['$$this.chat_id', '$$chat._id'],
                          },
                        },
                      },
                      0,
                    ],
                  },
                  { info: '$$chat' },
                ],
              },
            },
          },
        })
        .project({
          _id: false,
          result: {
            $filter: {
              input: '$resolved_chats',
              as: 'chat',
              cond: {
                $in: ['$$chat.state', states],
              },
            },
          },
        })
    )[0];

    return result as UserChatDetails[];
  }

  async getUserChat(userId: string, chatId: string) {
    return this.getUserChats(userId, { ids: [chatId] })[0];
  }

  async updateUserChat(
    userId: string,
    chatId: string,
    data: UpdateUserChatData,
  ) {
    const updateQuery = {};

    const user = await this.model.findOneAndUpdate(
      {
        _id: userId,
        'chats.chat_id': chatId,
      },
      {
        'chats.$.state': data.state,
      },
      {
        new: true,
      },
    );

    return user;
  }
}
