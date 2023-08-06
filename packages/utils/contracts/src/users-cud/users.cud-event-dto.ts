import { CudTypeEvents } from '../cud-type-events.enum';
import { UserDto } from './user.dto';

type UserBaseCudEventDto = {
  operation: CudTypeEvents;
  id: string;
  data: UserDto;
};
export type UserCreateCudEventDto = UserBaseCudEventDto & { operation: CudTypeEvents.CREATE };
export type UserUpdateCudEventDto = UserBaseCudEventDto & { operation: CudTypeEvents.UPDATE };
export type UserCudEvent = UserCreateCudEventDto | UserUpdateCudEventDto;
