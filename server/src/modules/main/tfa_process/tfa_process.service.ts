import { TfaProcess, TfaProcessModel } from '@modules/extra/database/schemas';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TfaProcessEntity } from './types';
import ms from 'ms';

@Injectable()
export class TfaProcessService {
  constructor(@InjectModel(TfaProcess.name) public model: TfaProcessModel) {}

  private timeParser(time: string | number): number {
    if (typeof time === 'string') return ms(time);
    return time;
  }

  create(entity: TfaProcessEntity) {
    const code = entity.getCode();
    const time = this.timeParser(entity.time);

    return this.model.create({
      name: entity.process_name,
      user_id: entity.user_id,
      type: entity.type,
      limit: entity.limit,
      time,
      code,
    });
  }

  findOne(processId: string) {
    return this.model.findById(processId);
  }

  async verify(processId: string, code: string) {
    const process = await this.findOne(processId);
  }
}
