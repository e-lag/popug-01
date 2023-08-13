import { Provider } from '@nestjs/common';
import { TaskQueryHandler } from './task/task.query-handler';
import { TasksQueryHandler } from './tasks/tasks.query-handler';

export const TASK_QUERIES: Provider[] = [TasksQueryHandler, TaskQueryHandler];
