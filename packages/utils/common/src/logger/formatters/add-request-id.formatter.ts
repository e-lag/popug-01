import * as winston from 'winston';

import { getRequestId } from '../request-id';

/**
 * Функция-преобразователь для winston лога
 * Позволяет добавить requestId из запроса к логам
 * Нужно, чтобы можно было выполнять трассировку логов в пределах запроса
 */
export const addRequestIdFormatter: winston.Logform.FormatWrap = winston.format((info) => {
  return {
    ...info,
    requestId: getRequestId(),
  };
});
