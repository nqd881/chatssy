import {
  MessageBucket,
  MessageBucketModel,
} from '@modules/extra/models/message-bucket.model';
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
    @InjectModel(MessageBucket) private bucketModel: MessageBucketModel,
    private envConfig: ConfigService,
  ) {}

  _lastBucketQuery(chatId: string) {
    return {
      chat_id: chatId,
      is_last_bucket: true,
    };
  }

  _canBeUpdatedBucketQuery() {
    return {
      messages_count: { $lt: this.envConfig.get(Env.MESSAGE_BUCKET_MAX_COUNT) },
    };
  }

  async findLastBucket(chatId: string) {
    return this.bucketModel.findOne(this._lastBucketQuery(chatId));
  }

  async createBucket(chatId: string, order: number, prevBucketId: string) {
    const newBucket = this.bucketModel.create({
      chat_id: chatId,
      order,
      prev_bucket_id: prevBucketId,
      is_last_bucket: true,
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
                    chat_id: '$chat_id',
                    bucket_id: '$_id',
                    sender_id: new mongoose.Types.ObjectId(data.sender),
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
            messages_count: { $size: '$messages' },
            last_message: { $last: '$messages' },
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
          lastBucket.chat_id.toString(),
          lastBucket.order + 1,
          lastBucket.id,
        );

        lastBucket.is_last_bucket = false;
        lastBucket.save();
      } else {
        await this.createBucket(chatId, 1, null);
      }

      return this.newMessage(chatId, data);
    }

    return bucket.last_message;
  }

  async findMessage(bucketId: string, messageId: string) {
    const bucket = await this.bucketModel.findById(bucketId);

    return bucket.messages.find(
      (message) => message._id.toString() === messageId,
    );
  }
}
