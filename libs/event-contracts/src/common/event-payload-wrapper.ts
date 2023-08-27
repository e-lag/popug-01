import { RabbitMQExchangeConfig } from '@golevelup/nestjs-rabbitmq';

export type EventPayloadWrapper<
  EventType extends string,
  EventPayload = unknown,
> = {
  eventType: EventType;
  version: string;
  emittedAt: number;
  event: EventPayload;
};
export const eventPayloadWrapper = <
  EventType extends string,
  EventPayload = unknown,
>(
  eventType: EventType,
  version: string,
  event: EventPayload,
): EventPayloadWrapper<EventType, EventPayload> => ({
  eventType,
  version,
  emittedAt: new Date().getTime(),
  event,
});

export type EventPublishParam = {
  exchange: RabbitMQExchangeConfig['name'];
  routingKey: string;
};
