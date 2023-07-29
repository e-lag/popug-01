import * as winston from 'winston';
/**
 * Функция-преобразователь для winston лога
 * Убирает internalPayloadString из лога
 */
export declare const removeInternalPayloadStringFormatter: winston.Logform.FormatWrap;
