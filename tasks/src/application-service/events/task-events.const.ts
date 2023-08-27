import { Provider } from '@nestjs/common';
import { TaskAssignedEventHandler } from './task-assigned/task-assigned.event-handler';
import { TaskFinishedEventHandler } from './task-finished/task-finished.event-handler';

export const TASK_EVENTS: Provider[] = [
  TaskFinishedEventHandler,
  TaskAssignedEventHandler,
];
