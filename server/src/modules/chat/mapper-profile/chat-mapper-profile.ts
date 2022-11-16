import {
  createMap,
  forMember,
  mapFrom,
  Mapper,
  MappingConfiguration,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { DbChat, DbChatMember } from 'src/db-models/chat.model';
import { ApiDataChat, ApiDataChatMember } from '../api/data/chat.data';

@Injectable()
export class ChatMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, DbChatMember, ApiDataChatMember);
      createMap(mapper, DbChat, ApiDataChat);
    };
  }

  get mappingConfigurations(): MappingConfiguration[] {
    return [
      forMember(
        (des) => des.id,
        mapFrom((source) => source._id.toString()),
      ),
    ];
  }
}
