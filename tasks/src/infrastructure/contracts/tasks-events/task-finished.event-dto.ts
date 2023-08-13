import { Task } from '../../../enitities/task.entity';
import { TASKS_EXCHANGE } from './tasks.exchange';

export const TASK_FINISHED_EVENT_CONFIG = {
  exchange: TASKS_EXCHANGE,
  routingKey: 'taskFinished',
};

export type TaskFinishedEventPayload = Task;
