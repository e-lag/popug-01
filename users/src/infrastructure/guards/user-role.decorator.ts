import { SetMetadata } from '@nestjs/common';
import { UserRoles } from '../../types/user-roles.enum';

export const Roles = (...roles: UserRoles[]) => SetMetadata('roles', roles);
