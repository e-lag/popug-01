import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';

import { Task } from '../entities/task.entity';

@Injectable()
export class AccountService {
  constructor(private em: EntityManager) {}

  public async list(limit: number, offset: number): Promise<[Task[], number]> {
    return this.em.findAndCount(Task, {}, { limit, offset });
  }

  public async create(...attr: unknown[]): Promise<unknown> {
    return Promise.resolve({ status: 'unresolved', ...attr });
  }

  public async assign(...attr: unknown[]): Promise<unknown> {
    return Promise.resolve({ status: 'unresolved', ...attr });
  }

  public async statusSet(...attr: unknown[]): Promise<unknown> {
    return Promise.resolve({ status: 'unresolved', ...attr });
  }
}
