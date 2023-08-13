import { CudTypeEvents } from '../cud-type-events.enum';
import { UserDto } from './user.dto';

type UserBaseStreamEventDto = {
  operation: CudTypeEvents;
  id: string;
  data: UserDto;
};
export type UserCreateStreamEventDto = UserBaseStreamEventDto & {
  operation: CudTypeEvents.CREATE;
};
export type UserUpdateStreamEventDto = UserBaseStreamEventDto & {
  operation: CudTypeEvents.UPDATE;
};
export type UserStreamEvent =
  | UserCreateStreamEventDto
  | UserUpdateStreamEventDto;
