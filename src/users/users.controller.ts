import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserResponseDto } from './dto/user-response.dto';
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}
  @Get(':id') async get(@Param('id') id: string) { const user = await this.service.findById(id); return user ? UserResponseDto.fromEntity(user) : null; }
  @Patch(':id') async update(@Param('id') id: string, @Body() body: { displayName?: string; bio?: string; avatarUrl?: string | null; status?: 'online'|'idle'|'dnd'|'offline' }) {
    const user = await this.service.update(id, body); return user ? UserResponseDto.fromEntity(user) : null;
  }
}
