/**
 * Полезная нагрузка jwt токена
 */
export interface MobileJwtPayloadDto {
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
