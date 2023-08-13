export class EmailConfirmCommand {
  constructor(
    public readonly userId: string,
    public readonly email: string,
    public readonly confirmCode: string,
  ) {}
}
