import { DbMessageContentTypes } from '@dbmodels/message';
import { TransformDate } from '@decorators/transform/transform-date.decorator';
import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { ClassConstructor, Type } from 'class-transformer';

export class ApiDataDocument {}

export class ApiDataMessageContent {
  @ApiProperty()
  contentType: DbMessageContentTypes;
}

export class ApiDataMessageContentText extends ApiDataMessageContent {
  @ApiProperty()
  text: string;
}
export class ApiDataMessageContentDocument extends ApiDataMessageContent {
  @ApiProperty()
  document: ApiDataDocument;
}

export const API_DATA_MESSAGE_CONTENT_MAP: Partial<
  Record<DbMessageContentTypes, ClassConstructor<any>>
> = {
  [DbMessageContentTypes.Text]: ApiDataMessageContentText,
  [DbMessageContentTypes.Document]: ApiDataMessageContentDocument,
};

export class ApiDataMessage {
  @ApiProperty()
  id: string;

  @ApiProperty()
  chatId: string;

  @ApiProperty()
  senderId: string;

  @ApiProperty()
  @TransformDate()
  date: Date;

  @ApiProperty()
  mentions: string[];

  @ApiProperty({
    oneOf: Object.values(API_DATA_MESSAGE_CONTENT_MAP).map(
      (classConstructor) => ({
        $ref: getSchemaPath(classConstructor),
      }),
    ),
  })
  @Type(() => ApiDataMessageContent, {
    discriminator: {
      property: 'contentType',
      subTypes: Object.entries(API_DATA_MESSAGE_CONTENT_MAP).map(
        ([contentType, classConstructor]) => ({
          name: contentType,
          value: classConstructor,
        }),
      ),
    },
  })
  content: ApiDataMessageContent;
}
