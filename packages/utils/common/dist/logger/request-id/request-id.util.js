"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runPromise = exports.requestIdMiddleware = exports.setRequestId = exports.getRequestId = exports.namespace = void 0;
const cls_hooked_1 = require("cls-hooked");
/**
 * namespace
 */
exports.namespace = (0, cls_hooked_1.createNamespace)('app');
/**
 * Метод получения id запроса из CLS
 */
function getRequestId() {
    return exports.namespace.get('requestId');
}
exports.getRequestId = getRequestId;
/**
 * Установка id запроса
 * @param requestId
 */
function setRequestId(requestId) {
    exports.namespace.set('requestId', requestId);
}
exports.setRequestId = setRequestId;
/** middleware для добавления request-id в контекст выполнения */
function requestIdMiddleware(request, response, next) {
    exports.namespace.bindEmitter(request);
    exports.namespace.bindEmitter(response);
    exports.namespace.run(() => {
        const headerRequestID = request.headers['x-request-id'];
        exports.namespace.set('requestId', headerRequestID);
        next();
    });
}
exports.requestIdMiddleware = requestIdMiddleware;
/**
 * Запуск промиса
 * @param fn
 */
function runPromise(fn) {
    return exports.namespace.runPromise(fn);
}
exports.runPromise = runPromise;
//# sourceMappingURL=request-id.util.js.map