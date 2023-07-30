import { Request } from 'express';

import { UserRoles } from './user-roles.enum';

export interface AuthUser {
  id: string;
  roles: UserRoles[];
}
export interface AuthRequest extends Request {
  user: AuthUser;
}
