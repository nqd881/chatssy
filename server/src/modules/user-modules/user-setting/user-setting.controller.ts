import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatssyApiTags } from 'src/constant/docs';

@ApiTags(ChatssyApiTags.DbUser)
@Controller()
export class UserSettingController {}
