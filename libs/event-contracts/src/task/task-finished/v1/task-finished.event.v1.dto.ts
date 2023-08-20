import { EventPayloadWrapper, EventPublishParam } from '../../../common';
import { TaskStatuses } from '../../task-statuses.enum';
import { TASK_EXCHANGE } from '../../task.exchange';

export type TaskFinishedEventV1Payload = {
  id: string;
  title: string;
  description: string;
  assigner: string;
  priceAssign: number;
  priceFinish: number;
  status: TaskStatuses;
  createdAt: Date;
  updatedAt: Date;
};

export const TaskFinishedEventV1: EventPublishParam = {
  exchange: TASK_EXCHANGE.name,
  routingKey: 'task-finished',
};

export type TaskFinishedEventV1 = EventPayloadWrapper<
  'task-finished',
  TaskFinishedEventV1Payload
>;
