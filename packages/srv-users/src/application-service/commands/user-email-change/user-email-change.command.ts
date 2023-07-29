export class UserEmailChangeCommand {
  constructor(public readonly userId: string, public readonly email: string) {}
}
