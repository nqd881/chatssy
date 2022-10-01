import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatssyApiTags } from 'src/constant/docs';

@ApiTags(ChatssyApiTags.User)
@Controller()
export class UserInfoController {}
