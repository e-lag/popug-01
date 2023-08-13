import { Provider } from '@nestjs/common';
import { TaskChangedStreamEventHandler } from './task-changed/task-changed.stream-event-handler';
import { TaskCreatedStreamEventHandler } from './task-created/task-created.stream-event-handler';

export const TASK_STREAM_EVENTS: Provider[] = [
  TaskCreatedStreamEventHandler,
  TaskChangedStreamEventHandler,
];
