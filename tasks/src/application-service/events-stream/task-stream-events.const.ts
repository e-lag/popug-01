import { Provider } from '@nestjs/common';
import { TaskUpdatedStreamEventHandler } from './task-changed/task-updated.stream-event-handler';
import { TaskCreatedStreamEventHandler } from './task-created/task-created.stream-event-handler';

export const TASK_STREAM_EVENTS: Provider[] = [
  TaskCreatedStreamEventHandler,
  TaskUpdatedStreamEventHandler,
];
