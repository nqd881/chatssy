import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import {
  ClassConstructor,
  Expose,
  plainToInstance,
  Transform,
} from 'class-transformer';
import { IsEnum, IsString, ValidateNested } from 'class-validator';
import { DbMessageContentTypes } from 'src/db-models/message';

export class ApiPayloadCreateMessageContentText {
  @ApiProperty()
  @IsString()
  @Expose()
  text: string;
}

export class ApiPayloadCreateMessageContentDocument {
  @ApiProperty()
  @IsString()
  @Expose()
  fileName: string;

  @ApiProperty()
  @IsString()
  @Expose()
  mimeType: string;
}

export const API_PAYLOAD_CREATE_MESSAGE_CONTENT_MAP: Partial<
  Record<DbMessageContentTypes, ClassConstructor<any>>
> = {
  [DbMessageContentTypes.Text]: ApiPayloadCreateMessageContentText,
  [DbMessageContentTypes.Document]: ApiPayloadCreateMessageContentDocument,
};

export class ApiPayloadCreateMessage {
  @ApiProperty()
  @IsEnum(DbMessageContentTypes)
  @IsString()
  @Expose()
  contentType: DbMessageContentTypes;

  @ApiProperty({
    oneOf: Object.values(API_PAYLOAD_CREATE_MESSAGE_CONTENT_MAP).map(
      (classConstructor) => ({
        $ref: getSchemaPath(classConstructor),
      }),
    ),
  })
  @ValidateNested()
  @Transform((params) => {
    return plainToInstance(
      API_PAYLOAD_CREATE_MESSAGE_CONTENT_MAP[params.obj['contentType']],
      params.value,
      {
        excludeExtraneousValues: true,
      },
    );
  })
  @Expose()
  content: any;
}
