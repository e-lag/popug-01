export class PasswordChangeCommand {
  constructor(
    public readonly userId: string,
    public readonly passwordCurrent: string,
    public readonly passwordNew: string,
    public readonly passwordNewConfirm: string,
  ) {}
}
