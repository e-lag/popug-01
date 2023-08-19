import { Provider } from '@nestjs/common';
import { UserRoleChangedEventHandler } from './user-role-changed/user-role-changed.event-handler';

export const USER_EVENT_HANDLERS: Provider[] = [UserRoleChangedEventHandler];
