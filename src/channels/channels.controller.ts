import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChannelsService, ChannelType } from './channels.service';
@Controller('communities/:communityId/channels')
export class ChannelsController {
  constructor(private readonly service: ChannelsService) {}
  @Get() list(@Param('communityId') communityId: string) { return this.service.list(communityId); }
  @Post() create(@Param('communityId') communityId: string, @Body() body: { name: string; type: ChannelType }) { return this.service.create(communityId, body.name, body.type); }
}
