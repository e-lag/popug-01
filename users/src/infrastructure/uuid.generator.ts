import { v4 } from 'uuid';
/** Класс обёртка для тестирования */
export class UuidGenerator {
  public static generate(): string {
    return v4();
  }
}
