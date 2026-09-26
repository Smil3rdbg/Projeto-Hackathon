import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';
@Controller('channels/:channelId/messages')
export class MessagesController {
  constructor(private readonly service: MessagesService) {}
  @Get() list(@Param('channelId') channelId: string) { return this.service.list(channelId); }
  @Post() create(@Param('channelId') channelId: string, @Body() body: { authorId: string; authorName: string; content: string }) { return this.service.create(channelId, body.authorId, body.authorName, body.content); }
}
