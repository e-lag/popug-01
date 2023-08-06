import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { UserCudService } from '@popug/common';
import { UserCudEvent, USERS_CUD_EXCHANGE } from '@popug/contracts';

@Injectable()
export class UsersCudConsumer {
  constructor(private readonly userCudService: UserCudService) {}

  @RabbitSubscribe({
    exchange: USERS_CUD_EXCHANGE.name,
    routingKey: 'task-srv',
    queue: USERS_CUD_EXCHANGE.name + '-task-srv',
  })
  public async userCudEvents(event: UserCudEvent): Promise<void> {
    await this.userCudService.userCudEventHandler(event);
  }
}
