import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Task } from '../../enitities/task.entity';
import { CudTypeEvents } from '../contracts/cud-type-events.enum';
import {
  TASKS_FANOUT_EXCHANGE,
  TaskStreamEvent,
} from '../contracts/tasks-stream-events';

@Injectable()
export class TaskStreamingSubscriber {
  constructor(private readonly em: EntityManager) {}

  @RabbitSubscribe({
    exchange: TASKS_FANOUT_EXCHANGE.name,
    routingKey: ' billing-srv',
    queue: TASKS_FANOUT_EXCHANGE.name + 'billing-srv',
  })
  public async taskCudEvents(event: TaskStreamEvent): Promise<void> {
    switch (event.operation) {
      case CudTypeEvents.CREATE:
        this.em.create(Task, event.data);
        await this.em.flush();
        return;
      case CudTypeEvents.UPDATE:
        await this.em.nativeUpdate(Task, { id: event.id }, event.data);
        return;
      default:
        return;
    }
  }
}
