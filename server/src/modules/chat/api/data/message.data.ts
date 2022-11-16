import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class ApiDataMessage {
  @ApiProperty()
  @AutoMap()
  id: string;

  @ApiProperty()
  @AutoMap()
  chatId: string;

  @ApiProperty()
  @AutoMap()
  senderId: string;

  @ApiProperty()
  @AutoMap()
  date: Date;

  @ApiProperty()
  @AutoMap()
  type: string;

  @ApiProperty()
  @AutoMap()
  content: any;
}
