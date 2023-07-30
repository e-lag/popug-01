import { UserRoles } from './user-roles.enum';

/**
 * Полезная нагрузка jwt токена
 */
export interface MobileJwtPayloadDto {
  /**
   * id клиента
   */
  sub: string;
  /**
   * email
   */
  email: string;
  /** Роли */
  roles: UserRoles[];
  /**
   * Дата, до которой токен действителен
   */
  validTo: Date;
  /**
   * Является ли пользователь разработчиком
   */
  developer: boolean;
  /**
   * Время выпуска токена
   */
  iat: number;
  /**
   * Время завершения действия токена
   */
  exp: number;
}
