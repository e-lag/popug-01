import { Provider } from '@nestjs/common';
import { TaskAssignerSetEventHandler } from './task-assigner-set/task-assigner-set.event-handler';
import { TaskFinishedEvent } from './task-finished/task-finished.event';

export const TASK_EVENTS: Provider[] = [
  TaskFinishedEvent,
  TaskAssignerSetEventHandler,
];
