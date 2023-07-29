import * as winston from 'winston';
/**
 * Функция-преобразователь для winston лога
 * Позволяет добавить requestId из запроса к логам
 * Нужно, чтобы можно было выполнять трассировку логов в пределах запроса
 */
export declare const addRequestIdFormatter: winston.Logform.FormatWrap;
