import { UserDomain } from '../domain/user.domain';
import { UserEmailConfirm } from './user-email-confirm.entity';
import { UserLogin } from './user-login.entity';

export const REPOSITORY_ENTITIES = [UserDomain, UserLogin, UserEmailConfirm];
