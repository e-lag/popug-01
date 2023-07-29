export class NikNameChangeCommand {
  constructor(
    public readonly userId: string,
    public readonly nikName: string,
  ) {}
}
