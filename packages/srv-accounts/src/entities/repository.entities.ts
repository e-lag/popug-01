import { CUD_ENTITIES } from '../consumes/cud/cud.module';
import { AccountAssignTask } from './account-assign-task.entity';
import { Account } from './account.entity';

export const REPOSITORY_ENTITIES = [...CUD_ENTITIES, Account,AccountAssignTask,];
