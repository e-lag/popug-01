import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { ref } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { TaskAssignedEventV1, TaskFinishedEventV1 } from 'event-contracts/dist';
import { TaskAssignedCommand } from '../application-service/commands/task-assigned/task-assigned.command';
import { TaskFinishedCommand } from '../application-service/commands/task-finished/task-finished.command';
import { Task } from '../enitities/task.entity';
import { User } from '../enitities/user.entity';

@Injectable()
export class TaskBeConsumer {
  constructor(private readonly commandBus: CommandBus) {}

  @RabbitSubscribe({
    exchange: TaskAssignedEventV1.exchange,
    routingKey: TaskAssignedEventV1.routingKey,
    queue:
      TaskAssignedEventV1.exchange +
      TaskAssignedEventV1.routingKey +
      '-task-srv',
  })
  public async taskAssignedEvent(
    eventPayload: TaskAssignedEventV1,
  ): Promise<void> {
    const { event } = eventPayload;
    await this.commandBus.execute(
      new TaskAssignedCommand(this.taskEntityGet(event)),
    );
  }

  @RabbitSubscribe({
    exchange: TaskFinishedEventV1.exchange,
    routingKey: TaskFinishedEventV1.routingKey,
    queue:
      TaskFinishedEventV1.exchange +
      TaskFinishedEventV1.routingKey +
      '-task-srv',
    queueOptions: {
      deadLetterExchange: TaskFinishedEventV1.exchange,
      deadLetterRoutingKey: TaskFinishedEventV1.routingKey + 'deadLetter',
    },
  })
  public async taskFinishedEvent(
    eventPayload: TaskFinishedEventV1,
  ): Promise<void> {
    const { event } = eventPayload;
    await this.commandBus.execute(
      new TaskFinishedCommand(this.taskEntityGet(event)),
    );
  }

  private taskEntityGet(
    props: TaskAssignedEventV1['event'] | TaskFinishedEventV1['event'],
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
