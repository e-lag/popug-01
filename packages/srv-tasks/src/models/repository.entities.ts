import { CUD_ENTITIES } from '../consumes/cud/cud.module';
import { Task } from './task.entity';

export const REPOSITORY_ENTITIES = [...CUD_ENTITIES, Task];
