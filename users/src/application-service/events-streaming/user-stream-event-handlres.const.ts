import { Provider } from '@nestjs/common';

import { UserChangedEventHandler } from './user-changed/user-changed.event-handler';
import { UserCreatedEventHandler } from './user-created/user-created.event-handler';

export const USER_STREAM_EVENT_HANDLERS: Provider[] = [
  UserCreatedEventHandler,
  UserChangedEventHandler,
];
