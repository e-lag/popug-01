import {
  CudTypeEvents,
  EventPayloadWrapper,
  EventPublishParam,
} from '../../../common';
import { USER_EXCHANGE } from '../../user.exchange';

export type UserStreamPayloadV1 = {
  id: string;
  email: string;
  role: string;
  nikName?: string | undefined;
  phone?: string | undefined;
  avatar?: string | undefined;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export const UserCreatedStreamEventV1: EventPublishParam = {
  exchange: USER_EXCHANGE.name,
  routingKey: 'user-created-stream',
};

export type UserCreatedStreamEventV1 = EventPayloadWrapper<
  CudTypeEvents.CREATED,
  UserStreamPayloadV1
>;

export const UserUpdatedStreamEventV1: EventPublishParam = {
  exchange: USER_EXCHANGE.name,
  routingKey: 'user-updated-stream',
};
export type UserUpdatedStreamEventV1 = EventPayloadWrapper<
  CudTypeEvents.UPDATED,
  UserStreamPayloadV1
>;
