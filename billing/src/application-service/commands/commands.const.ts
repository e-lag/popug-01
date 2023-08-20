import { Provider } from '@nestjs/common';
import { CommitBalanceCommandHandler } from './commit-balance/commit-balance.command-handler';
import { TaskAssignedCommandHandler } from './task-assigned/task-assigned.command-handler';
import { TaskFinishedCommandHandler } from './task-finished/task-finished.command-handler';

export const COMMANDS: Provider[] = [
  TaskFinishedCommandHandler,
  TaskAssignedCommandHandler,
  CommitBalanceCommandHandler,
];
