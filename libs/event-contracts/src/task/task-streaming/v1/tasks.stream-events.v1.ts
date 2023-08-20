import {
  CudTypeEvents,
  EventPayloadWrapper,
  EventPublishParam,
} from '../../../common';
import { TaskStatuses } from '../../task-statuses.enum';
import { TASK_EXCHANGE } from '../../task.exchange';

export type TaskStreamPayloadV1 = {
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

export const TaskCreatedStreamEventV1: EventPublishParam = {
  exchange: TASK_EXCHANGE.name,
  routingKey: 'task-created-stream',
};

export type TaskCreatedStreamEventV1 = EventPayloadWrapper<
  CudTypeEvents.CREATED,
  TaskStreamPayloadV1
>;
export const TaskUpdatedStreamEventV1: EventPublishParam = {
  exchange: TASK_EXCHANGE.name,
  routingKey: 'task-updated-stream',
};

export type TaskUpdatedStreamEventV1 = EventPayloadWrapper<
  CudTypeEvents.UPDATED,
  TaskStreamPayloadV1
>;
