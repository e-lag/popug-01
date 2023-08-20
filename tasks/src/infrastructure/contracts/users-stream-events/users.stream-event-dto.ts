import { CudTypeEvents } from '../cud-type-events.enum';
import { UserStreamDto } from './user.dto';

type UserBaseStreamEventDto = {
  operation: CudTypeEvents;
  id: string;
  data: UserStreamDto;
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
