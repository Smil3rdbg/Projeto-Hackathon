import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
export interface Session { id: string; userId: string; deviceName: string; location: string; lastActiveAt: Date; current: boolean; }
@Injectable()
export class SessionsService {
  private readonly sessions: Session[] = [];
  create(userId: string, deviceName = 'Navegador', location = 'São Paulo, BR') {
    const session = { id: uuid(), userId, deviceName, location, lastActiveAt: new Date(), current: true };
    this.sessions.push(session); return session;
  }
  list(userId: string) { return this.sessions.filter(s => s.userId === userId); }
  end(userId: string, id: string) { const s = this.sessions.find(x => x.id === id && x.userId === userId); if (s) s.current = false; return s ?? null; }
}
