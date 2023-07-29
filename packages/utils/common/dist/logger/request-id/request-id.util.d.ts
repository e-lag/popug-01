import { NextFunction, Request, Response } from 'express';
/**
 * namespace
 */
export declare const namespace: import("cls-hooked").Namespace<Record<string, any>>;
/**
 * Метод получения id запроса из CLS
 */
export declare function getRequestId(): string | undefined;
/**
 * Установка id запроса
 * @param requestId
 */
export declare function setRequestId(requestId: string): void;
/** middleware для добавления request-id в контекст выполнения */
export declare function requestIdMiddleware(request: Request, response: Response, next: NextFunction): void;
/**
 * Запуск промиса
 * @param fn
 */
export declare function runPromise<T>(fn: (...args: unknown[]) => Promise<T>): Promise<T>;
