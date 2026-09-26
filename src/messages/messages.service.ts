import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
export interface Message { id: string; channelId: string; authorId: string; authorName: string; content: string; createdAt: Date; attachment?: { name: string; size: string }; }
@Injectable()
export class MessagesService {
  private readonly messages: Message[] = [
    { id: uuid(), channelId: 'general', authorId: 'orion', authorName: 'Orion', content: 'Bom dia, pessoal!\nAlguém já testou a nova API?', createdAt: new Date(Date.now() - 8 * 60_000) },
    { id: uuid(), channelId: 'general', authorId: 'lyra', authorName: 'Lyra', content: 'Sim! Rodei alguns testes aqui e a performance ficou incrível.', createdAt: new Date(Date.now() - 5 * 60_000) },
    { id: uuid(), channelId: 'general', authorId: 'nova-bot', authorName: 'NovaBot', content: 'Lembrete: reunião de alinhamento hoje às 15:00 no canal #reunião.', createdAt: new Date(Date.now() - 2 * 60_000) },
    { id: uuid(), channelId: 'general', authorId: 'stela', authorName: 'Stelar', content: 'Vou compartilhar um resumo do que fizemos até agora.', createdAt: new Date(Date.now() - 1 * 60_000), attachment: { name: 'resumo-projeto-1.pdf', size: '1.2 MB' } },
  ];
  list(channelId: string) { return this.messages.filter(m => m.channelId === channelId); }
  create(channelId: string, authorId: string, authorName: string, content: string) {
    const message: Message = { id: uuid(), channelId, authorId, authorName, content, createdAt: new Date() };
    this.messages.push(message); return message;
  }
}
