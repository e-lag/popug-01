/**
 * Полезная нагрузка jwt токена
 */
export interface JwtPayloadDto {
  /**
   * id клиента
   */
  sub: string;
  /**
   * Дата, до которой токен действителен
   */
  validTo: Date;
  /**
   * Время выпуска токена
   */
  iat: number;
  /**
   * Время завершения действия токена
   */
  exp: number;
}
