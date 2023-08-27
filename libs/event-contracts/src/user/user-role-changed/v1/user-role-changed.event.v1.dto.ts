import { EventPayloadWrapper, EventPublishParam } from '../../../common';
import { USER_EXCHANGE } from '../../user.exchange';

export type UserRoleChangedEventV1Payload = {
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
export const UserRoleChangedEventV1: EventPublishParam = {
  exchange: USER_EXCHANGE.name,
  routingKey: 'user-role-changed',
};

export type UserRoleChangedEventV1 = EventPayloadWrapper<
  'user-role-changed',
  UserRoleChangedEventV1Payload
>;
