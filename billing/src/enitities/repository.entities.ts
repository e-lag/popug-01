import { AccountAssignedTask } from './account-assigned-task.entity';
import { AccountFinishedTask } from './account-finished-task.entity';
import { Account } from './account.entity';
import { Task } from './task.entity';
import { User } from './user.entity';

export const REPOSITORY_ENTITIES = [
  Account,
  User,
  Task,
  AccountAssignedTask,
  AccountFinishedTask,
];
