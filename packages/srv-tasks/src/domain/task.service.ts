import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';

import { Task } from '../models/task.entity';

@Injectable()
export class TaskService {
  constructor(private em: EntityManager) {}

  public async list(limit: number, offset: number): Promise<[Task[], number]> {
    return this.em.findAndCount(Task, {}, { limit, offset });
  }
}
