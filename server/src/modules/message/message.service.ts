import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import _ from 'lodash';
import { InjectModel } from 'nestgoose';
import { DbMessage, DbMessageDoc, DbMessageModel } from 'src/db-models/message';
import {
  DbMessageBucket,
  DbMessageBucketDoc,
  DbMessageBucketModel,
} from 'src/db-models/message-bucket.model';

import { Env } from 'src/env/types';
import { AddMessageData } from './data-types';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(DbMessageBucket) private bucketModel: DbMessageBucketModel,
    @InjectModel(DbMessage) private messageModel: DbMessageModel,
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
      $expr: {
        $lt: ['$messagesCount', '$messagesMaxCount'],
      },
    };
  }

  async findLastBucket(chatId: string) {
    return this.bucketModel.findOne(this._lastBucketQuery(chatId));
  }

  buildLocalBucket(chatId: string, order: number, prevBucketId: string) {
    return new this.bucketModel({
      chatId,
      order,
      prevBucketId,
      isLastBucket: true,
      messagesMaxCount: new Number(
        this.envConfig.get(Env.MESSAGE_BUCKET_MAX_COUNT),
      ),
    });
  }

  async newMessage(chatId: string, data: AddMessageData) {
    const content = {
      contentType: data.contentType,
      ...data.content,
    };

    const message = new this.messageModel({
      chatId,
      bucketId: null,
      senderId: data.senderId,
      date: Date.now(),
      content,
    });

    if (message) {
      const bucket = await this.pushToLastBucket(chatId, message);
      return bucket.getLastMessage();
    }

    return null;
  }

  async pushToLastBucket(
    chatId: string,
    message: DbMessageDoc,
  ): Promise<DbMessageBucketDoc> {
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
                    ...message.toObject(),
                    bucketId: '$_id',
                    searchId: {
                      $concat: [
                        { $toString: '$_id' },
                        '.',
                        message._id.toString(),
                      ],
                    },
                  },
                ],
              ],
            },
          },
        },
        {
          $set: {
            messagesCount: { $size: '$messages' },
          },
        },
      ],
      {
        new: true,
      },
    );

    if (!bucket) {
      await this.createNewBucket(chatId);
      return this.pushToLastBucket(chatId, message);
    }

    return bucket;
  }

  async createNewBucket(chatId: string) {
    const lastBucket = await this.findLastBucket(chatId);

    if (lastBucket) {
      const newBucket = this.buildLocalBucket(
        lastBucket.chatId.toString(),
        lastBucket.order + 1,
        lastBucket.id,
      );

      lastBucket.isLastBucket = false;
      lastBucket.save();

      return newBucket.save();
    }

    const firstBucket = this.buildLocalBucket(chatId, 1, null);
    return firstBucket.save();
  }

  async findMessage(bucketId: string, messageId: string) {
    const bucket = await this.bucketModel.findById(bucketId);

    return bucket.messages.find(
      (message) => message._id.toString() === messageId,
    );
  }
}
