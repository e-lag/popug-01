import { EventPayloadWrapper, EventPublishParam } from '../../../common';
import { TaskStatuses } from '../../task-statuses.enum';
import { TASK_EXCHANGE } from '../../task.exchange';

export type TaskAssignedEventV1Payload = {
  id: string;
  title: string;
  jiraId?: string;
  description: string;
  assigner: string;
  priceAssign: number;
  priceFinish: number;
  status: TaskStatuses;
  createdAt: Date;
  updatedAt: Date;
};

export const TaskAssignedEventV1: EventPublishParam = {
  exchange: TASK_EXCHANGE.name,
  routingKey: 'task-assigned',
};

export type TaskAssignedEventV1 = EventPayloadWrapper<
  'task-assigned',
  TaskAssignedEventV1Payload
>;
