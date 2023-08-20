import { Task } from '../../../enitities/task.entity';
import { TASKS_EXCHANGE } from './tasks.exchange';

export const TASK_ASSIGNED_EVENT_CONFIG = {
  exchange: TASKS_EXCHANGE,
  routingKey: 'taskAssigned',
};

export type TaskAssignedEventPayload = Task;
