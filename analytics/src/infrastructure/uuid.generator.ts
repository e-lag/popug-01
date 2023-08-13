import { v4 } from 'uuid';

export class UuidGenerator {
  public static generate(): string {
    return v4();
  }
}
