import { TransformDate } from '@decorators/transform/transform-date.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ApiDataMessage } from './message.data';

export class ApiDataChatMember {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  inviterId: string;

  @ApiProperty()
  isAdmin: boolean;

  @ApiProperty()
  nickname: string;

  @ApiProperty()
  @TransformDate()
  joinedDate: Date;

  @ApiProperty()
  lastMessageViewedId: string;
}

export class ApiDataChat {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  photo: string;

  @ApiProperty()
  creatorId: string;

  @ApiProperty({ type: ApiDataChatMember })
  @Type(() => ApiDataChatMember)
  members: ApiDataChatMember[];

  @ApiProperty()
  @Type(() => ApiDataMessage)
  lastMessage: ApiDataMessage;
}
