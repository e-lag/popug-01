export class UserRegisterCommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly passwordConfirm: string,
    public readonly deviceId: string,
  ) {}
}
