/**
 * Тип класса
 */
export interface ClassType<T = unknown> {
  new (...args: unknown[]): T;
}
