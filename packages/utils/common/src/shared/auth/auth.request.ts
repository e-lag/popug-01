import type { Request } from 'express';

import { User } from '../users';

export interface AuthRequest extends Request {
  user: User;
}
