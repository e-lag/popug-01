import { StreamEventTypes } from '../cud-type-events.enum';
import { UserDto } from './user.dto';

type UserBaseStreamEventDto = {
  operation: StreamEventTypes | 'user-role-changed';
  id: string;
  data: UserDto;
};
export type UserRoleChangedEventDto = UserBaseStreamEventDto & {
  operation: 'user-role-changed';
};
export type UserCreateStreamEventDto = UserBaseStreamEventDto & {
  operation: StreamEventTypes.CREATE;
};
export type UserUpdateStreamEventDto = UserBaseStreamEventDto & {
  operation: StreamEventTypes.UPDATE;
};
export type UserStreamEvent =
  | UserCreateStreamEventDto
  | UserUpdateStreamEventDto;
