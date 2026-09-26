import { Controller, Get, Param, Post } from '@nestjs/common';
import { SessionsService } from './sessions.service';
@Controller('users/:userId/sessions')
export class SessionsController {
  constructor(private readonly service: SessionsService) {}
  @Get() list(@Param('userId') userId: string) { return this.service.list(userId); }
  @Post() create(@Param('userId') userId: string) { return this.service.create(userId); }
  @Post(':id/end') end(@Param('userId') userId: string, @Param('id') id: string) { return this.service.end(userId, id); }
}
