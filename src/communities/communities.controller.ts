import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommunitiesService } from './communities.service';

@Controller('communities')
export class CommunitiesController {
  constructor(private readonly service: CommunitiesService) {}
  @Get() list() { return this.service.list(); }
  @Get(':id') get(@Param('id') id: string) { return this.service.find(id); }
  @Post() create(@Body() body: { name: string; description?: string; ownerId?: string }) {
    return this.service.create(body.name, body.description ?? '', body.ownerId ?? 'guest');
  }
}
