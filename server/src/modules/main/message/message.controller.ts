import { Controller, Get, Param } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('messages')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get(':bucket_id/:message_id')
  getMessage(@Param() { bucket_id, message_id }) {
    return this.messageService.findMessage(bucket_id, message_id);
  }
}
