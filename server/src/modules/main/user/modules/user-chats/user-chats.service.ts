import {
  Chat,
  User,
  UserChat,
  UserChatStates,
  UserModel,
} from '@modules/extra/database/schemas';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { toArray } from '@utils';
import mongoose from 'mongoose';
import { combineQueries } from '../../mongoose-query/combine-queries';
import { IdFilter } from '../../mongoose-query/filter/id';
import { UserChatFilter } from '../../mongoose-query/filter/user-chat.filter';
import {
  AddChatQuery,
  UpdateChatQuery,
} from '../../mongoose-query/update/chats';
import { UpdateUserChatData } from './data-types';

export type UserChatDetails = UserChat & { info: Chat };

export type GetUserChatsOptions = {
  states?: UserChatStates[];
  ids?: string[];
};

@Injectable()
export class UserChatsService {
  constructor(@InjectModel(User.name) private model: UserModel) {}

  addChatToMembers(chatId: string, memberIds: string[]) {
    return this.model
      .updateMany(IdFilter(...memberIds), AddChatQuery(chatId))
      .exec();
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
    const result = (await this.getUserChats(userId, { ids: [chatId] }))[0];
    return result;
  }

  async updateUserChat(
    userId: string,
    chatId: string,
    data: UpdateUserChatData,
  ) {
    const user = await this.model.findOneAndUpdate(
      combineQueries(IdFilter(userId), UserChatFilter(chatId)),
      UpdateChatQuery(data.state),
      { new: true },
    );

    return user;
  }
}
