import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { TaskCudService } from '@popug/common/dist/shared/task/task-cud.service';
import { TASK_CUD_EXCHANGE, TaskCudEvent } from '@popug/contracts';

@Injectable()
export class UsersCudConsumer {
  constructor(private readonly taskCudService: TaskCudService) {}

  @RabbitSubscribe({
    exchange: TASK_CUD_EXCHANGE.name,
    routingKey: 'accounting-srv',
    queue: TASK_CUD_EXCHANGE.name + '-accounting-srv',
  })
  public async taskCudEvents(event: TaskCudEvent): Promise<void> {
    await this.taskCudService.userCudEventHandler(event);
  }
}
