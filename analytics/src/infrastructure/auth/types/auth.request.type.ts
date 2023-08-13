import { Request } from 'express';
import { User } from '../../../enitities/user.entity';

export interface AuthRequest extends Request {
  user: User;
}
