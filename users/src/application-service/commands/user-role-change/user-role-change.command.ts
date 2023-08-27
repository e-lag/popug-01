import { UserRoles } from '../../../types/user-roles.enum';

// Изменение роли пользователя
export class UserRoleChangeCommand {
  constructor(
    public readonly userId: string,
    public readonly role: UserRoles,
  ) {}
}
