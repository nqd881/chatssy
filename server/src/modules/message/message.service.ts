import {
  DbMessageBucket,
  DbMessageBucketModel,
} from 'src/db-models/message-bucket.model';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import _ from 'lodash';
import mongoose from 'mongoose';
import { InjectModel } from 'nestgoose';
import { Env } from 'src/env/types';
import { AddMessageData } from './data-types';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(DbMessageBucket) private bucketModel: DbMessageBucketModel,
    private envConfig: ConfigService,
  ) {}

  _lastBucketQuery(chatId: string) {
    return {
      chatId: chatId,
      isLastBucket: true,
    };
  }

  _canBeUpdatedBucketQuery() {
    return {
      messagesCount: { $lt: this.envConfig.get(Env.MESSAGE_BUCKET_MAX_COUNT) },
    };
  }

  async findLastBucket(chatId: string) {
    return this.bucketModel.findOne(this._lastBucketQuery(chatId));
  }

  async createBucket(chatId: string, order: number, prevBucketId: string) {
    const newBucket = this.bucketModel.create({
      chatId,
      order,
      prevBucketId,
      isLastBucket: true,
    });

    return newBucket;
  }

  async newMessage(chatId: string, data: AddMessageData) {
    const bucket = await this.bucketModel.findOneAndUpdate(
      _.merge(this._lastBucketQuery(chatId), this._canBeUpdatedBucketQuery()),
      [
        {
          $set: {
            messages: {
              $concatArrays: [
                '$messages',
                [
                  {
                    _id: new mongoose.Types.ObjectId(),
                    chatId: '$chatId',
                    bucketId: '$_id',
                    senderId: new mongoose.Types.ObjectId(data.senderId),
                    type: data.type,
                    content: data.content,
                    date: Date.now(),
                  },
                ],
              ],
            },
          },
        },
        {
          $set: {
            messagesCount: { $size: '$messages' },
            lastMessage: { $last: '$messages' },
          },
        },
      ],
      {
        new: true,
      },
    );

    if (!bucket) {
      const lastBucket = await this.findLastBucket(chatId);

      if (lastBucket) {
        await this.createBucket(
          lastBucket.chatId.toString(),
          lastBucket.order + 1,
          lastBucket.id,
        );

        lastBucket.isLastBucket = false;
        lastBucket.save();
      } else {
        await this.createBucket(chatId, 1, null);
      }

      return this.newMessage(chatId, data);
    }

    return bucket.lastMessage;
  }

  async findMessage(bucketId: string, messageId: string) {
    const bucket = await this.bucketModel.findById(bucketId);

    return bucket.messages.find(
      (message) => message._id.toString() === messageId,
    );
  }
}
