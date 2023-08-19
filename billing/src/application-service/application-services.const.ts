import { Provider } from '@nestjs/common';
import { COMMANDS } from './commands/commands.const';
import { EVENTS_STREAM } from './events-stream/events-stream.const';
import { EVENTS } from './events/events.const';
import { QUERIES } from './queries/queries.const';

export const APPLICATION_SERVICES: Provider[] = [
  ...COMMANDS,
  ...QUERIES,
  ...EVENTS,
  ...EVENTS_STREAM,
];
