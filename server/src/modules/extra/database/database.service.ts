import { Injectable } from '@nestjs/common';
import { isNull } from '@utils';
import {
  Document,
  FilterQuery,
  HydratedDocument,
  Model,
  UpdateQuery,
} from 'mongoose';
import { PartialDocument } from './types';

@Injectable()
export class DatabaseService {
  resolveDocUpdateQuery<U extends PartialDocument>(
    path: string | null,
    input: U,
  ) {
    let updateQuery: PartialDocument = {};
    let handledKeys: (key: string) => string;

    if (isNull(path) || path == '') handledKeys = (key: string) => key;
    else handledKeys = (key: string) => `${path}.${key}`;

    for (let key in input) {
      updateQuery[handledKeys(key)] = input[key];
    }
    return updateQuery;
  }

  updateDocLocal<Doc extends Document, U>(
    doc: Doc,
    path: string | null,
    input: U,
  ) {
    const updateQuery = this.resolveDocUpdateQuery(path, input);
    return doc.set(updateQuery);
  }

  async updateDocRemoteById<Doc, U>(
    model: Model<Doc>,
    docId: string,
    path: string | null,
    input: U,
  ): Promise<Doc> {
    const updateQuery = this.resolveDocUpdateQuery(path, input);
    return model.findByIdAndUpdate(docId, updateQuery, { new: true });
  }
}
