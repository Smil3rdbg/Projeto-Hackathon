import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
export type ChannelType = 'text' | 'voice';
export interface Channel { id: string; communityId: string; name: string; type: ChannelType; position: number; }
@Injectable()
export class ChannelsService {
  private readonly channels: Channel[] = [
    { id: 'general', communityId: 'aurora-lab', name: 'geral', type: 'text', position: 0 },
    { id: 'announcements', communityId: 'aurora-lab', name: 'anúncios', type: 'text', position: 1 },
    { id: 'projects', communityId: 'aurora-lab', name: 'projetos', type: 'text', position: 2 },
    { id: 'lounge', communityId: 'aurora-lab', name: 'Lounge', type: 'voice', position: 0 },
    { id: 'main-room', communityId: 'aurora-lab', name: 'Sala principal', type: 'voice', position: 1 },
  ];
  list(communityId: string) { return this.channels.filter(c => c.communityId === communityId); }
  create(communityId: string, name: string, type: ChannelType) {
    if (!name) throw new NotFoundException('Nome do canal é obrigatório.');
    const channel: Channel = { id: uuid(), communityId, name, type, position: this.list(communityId).length };
    this.channels.push(channel); return channel;
  }
}
