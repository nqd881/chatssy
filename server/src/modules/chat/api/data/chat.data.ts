import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ApiDataMessage } from './message.data';
import { AutoMap } from '@automapper/classes';

export class ApiDataChatMember {
  @ApiProperty()
  @AutoMap()
  id: string;

  @ApiProperty()
  @AutoMap()
  userId: string;

  @ApiProperty()
  @AutoMap()
  inviterId: string;

  @ApiProperty()
  @AutoMap()
  isAdmin: boolean;

  @ApiProperty()
  @AutoMap()
  nickname: string;

  @ApiProperty()
  @AutoMap()
  joinedDate: Date;

  @ApiProperty()
  @AutoMap()
  lastMessageViewedId: string;
}

export class ApiDataChat {
  @ApiProperty()
  @AutoMap()
  id: string;

  @ApiProperty()
  @AutoMap()
  title: string;

  @ApiProperty()
  @AutoMap()
  photo: string;

  @ApiProperty()
  @AutoMap()
  creatorId: string;

  @ApiProperty({ type: ApiDataChatMember })
  @AutoMap(() => ApiDataChatMember)
  members: ApiDataChatMember[];

  @ApiProperty()
  @AutoMap()
  lastMessage: ApiDataMessage;
}
