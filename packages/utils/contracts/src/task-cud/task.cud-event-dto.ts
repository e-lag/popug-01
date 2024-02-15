import { CudTypeEvents } from '../cud-type-events.enum';
import { TaskDto } from './task.dto';

type TaskBaseCudEventDto = {
  operation: CudTypeEvents;
  id: string;
  data: TaskDto;
};
export type TaskCreateCudEventDto = TaskBaseCudEventDto & { operation: CudTypeEvents.CREATE };
export type TaskUpdateCudEventDto = TaskBaseCudEventDto & { operation: CudTypeEvents.UPDATE };
export type TaskCudEvent = TaskCreateCudEventDto | TaskUpdateCudEventDto;
