import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { ref } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import {
  TaskCreatedStreamEventV1,
  TaskUpdatedStreamEventV1,
} from 'event-contracts/dist';
import { Task } from '../../enitities/task.entity';
import { User } from '../../enitities/user.entity';

@Injectable()
export class TaskStreamingConsumer {
  constructor(private readonly em: EntityManager) {}

  @RabbitSubscribe({
    exchange: TaskCreatedStreamEventV1.exchange,
    routingKey: TaskCreatedStreamEventV1.routingKey,
    queue:
      TaskCreatedStreamEventV1.exchange +
      TaskCreatedStreamEventV1.routingKey +
      '-task-srv',
    queueOptions: {
      deadLetterExchange: TaskCreatedStreamEventV1.exchange,
      deadLetterRoutingKey: TaskCreatedStreamEventV1.routingKey + 'deadLetter',
    },
  })
  public async userCreatedStreamEvent(
    eventPayload: TaskCreatedStreamEventV1,
  ): Promise<void> {
    const { event } = eventPayload;
    this.em.create(Task, this.taskEntityGet(event));
    await this.em.flush();
  }

  @RabbitSubscribe({
    exchange: TaskUpdatedStreamEventV1.exchange,
    routingKey: TaskUpdatedStreamEventV1.routingKey,
    queue:
      TaskUpdatedStreamEventV1.exchange +
      TaskUpdatedStreamEventV1.routingKey +
      '-task-srv',
    queueOptions: {
      deadLetterExchange: TaskUpdatedStreamEventV1.exchange,
      deadLetterRoutingKey: TaskUpdatedStreamEventV1.routingKey + 'deadLetter',
    },
  })
  public async userUpdatedStreamEvent(
    eventPayload: TaskUpdatedStreamEventV1,
  ): Promise<void> {
    const { event } = eventPayload;
    await this.em.nativeUpdate(
      Task,
      { id: event.id },
      this.taskEntityGet(event),
    );
  }

  private taskEntityGet(
    props:
      | TaskUpdatedStreamEventV1['event']
      | TaskCreatedStreamEventV1['event'],
  ): Task {
    return {
      id: props.id,
      title: props.title,
      description: props.description,
      assigner: ref(User, props.assigner),
      priceAssign: props.priceAssign,
      priceFinish: props.priceFinish,
      status: props.status,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    };
  }
}
