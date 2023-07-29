export class UserLogoutCommand {
  constructor(public readonly userId: string, public readonly token: string) {}
}
