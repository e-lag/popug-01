// /** общий тип ответа */
// export type ResponseBase<ResponseData = unknown, ResponseMetadata = unknown | undefined> = AppResponse<
//   ResponseData,
//   ResponseMetadata
// >;

/** общий тип успешного ответа */
// export type SuccessResponseType<ResponseData = unknown, ResponseMetadata = unknown | undefined> = AppResponse<
//   ResponseData,
//   ResponseMetadata
// >;

/** общий тип неудачного ответа */
export type ErrorResponseType<
  ResponseData = undefined,
  ResponseMetadata extends ErrorResponseMeta = ErrorResponseMeta,
> = AppResponse<ResponseData, ResponseMetadata>;

/** Интерфейс ответа сервера */
export interface AppResponse<ResponseData = unknown, ResponseMetadata = unknown> {
  /** Метаданные ответа */
  meta: ResponseMetadata;
  /** Данные ответа */
  data: ResponseData;
}

// export interface BaseResponseMetadata {
//   /** Флаг успешности завершения запроса */
//   success: boolean;
// }

// export type ResponseMeta = SuccessResponseMeta | ErrorResponseMeta;

// export interface SuccessResponseMeta extends BaseResponseMetadata {
//   /** Флаг успешности завершения запроса, явно true для вывода типа */
//   success: true;
// }

export interface ErrorResponseMeta {
  success: false;
  /** Текстовый код ошибки, например `system.InternalException` */
  code: string;
  /** Поясняющее сообщение, сопровождающее ошибку */
  message: string;
  /** HTTP статус код ошибки */
  status: number;
  /** requestId запроса */
  requestId: string;
  /** Вспомогательное сообщение, более точно описывающее проблему */
  description?: string;
  /** Стектрейс для подробного изучения проблемы */
  stack?: object[];
}

export interface ValidationErrorResponse extends ErrorResponseMeta {
  /** Детализация ошибки валидации. Представляет собой объект, в котором
   * * ключ - свойство, не прошедшее валидацию
   * * значение - массив сообщений о не прошедших проверках
   */
  details: {
    [property: string]: string[];
  };
}
