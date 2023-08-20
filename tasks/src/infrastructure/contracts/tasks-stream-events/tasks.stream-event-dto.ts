import { CudTypeEvents } from '../cud-type-events.enum';
import { TaskStreamDto } from './task.dto';

type TaskBaseStreamEventDto = {
  operation: CudTypeEvents;
  id: string;
  data: TaskStreamDto;
};
export type TaskCreateStreamEventDto = TaskBaseStreamEventDto & {
  operation: CudTypeEvents.CREATE;
};
export type TaskChangedStreamEventDto = TaskBaseStreamEventDto & {
  operation: CudTypeEvents.UPDATE;
};
export type TaskStreamEvent =
  | TaskCreateStreamEventDto
  | TaskChangedStreamEventDto;
