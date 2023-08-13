import { Provider } from '@nestjs/common';
import { ReassignTaskCommandHandler } from './reassign-task/reassign-task.command-handler';
import { TaskCreateCommandHandler } from './task-create/task-create.command-handler';
import { TaskFinishCommandHandler } from './task-finish/task-finish.command-handler';

export const TASK_COMMANDS: Provider[] = [
  ReassignTaskCommandHandler,
  TaskCreateCommandHandler,
  TaskFinishCommandHandler,
];
