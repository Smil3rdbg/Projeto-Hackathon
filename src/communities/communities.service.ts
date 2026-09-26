import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

export interface Community { id: string; name: string; description: string; ownerId: string; icon: string; createdAt: Date; }

@Injectable()
export class CommunitiesService {
  private readonly communities = new Map<string, Community>();
  constructor() {
    const demo: Community = { id: 'aurora-lab', name: 'Aurora Lab', description: 'Comunidade para conversar, colaborar e crescer.', ownerId: 'demo-owner', icon: 'A', createdAt: new Date() };
    this.communities.set(demo.id, demo);
  }
  list() { return [...this.communities.values()]; }
  create(name: string, description: string, ownerId: string) {
    const community: Community = { id: uuid(), name, description: description || '', ownerId, icon: name.charAt(0).toUpperCase(), createdAt: new Date() };
    this.communities.set(community.id, community); return community;
  }
  find(id: string) { return this.communities.get(id) ?? null; }
}
