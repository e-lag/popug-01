"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var RequestLogInterceptor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestLogInterceptor = void 0;
const nestjs_rabbitmq_1 = require("@golevelup/nestjs-rabbitmq");
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
/**
 * Interceptor ля перехвата входящих http запросов.
 */
let RequestLogInterceptor = exports.RequestLogInterceptor = RequestLogInterceptor_1 = class RequestLogInterceptor {
    /**
     * Создает interceptor, логирующий запросы к серверу
     * @param configService
     */
    logger = new common_1.Logger(RequestLogInterceptor_1.name);
    constructor() { }
    /**
     * Метод для перехвата запроса
     * @param context - контекст исполнения
     * @param next
     */
    intercept(context, next) {
        const shouldSkip = (0, nestjs_rabbitmq_1.isRabbitContext)(context);
        if (shouldSkip) {
            return next.handle();
        }
        const now = new Date();
        const request = context.switchToHttp().getRequest();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        this.logRequest(request);
        return next.handle().pipe((0, operators_1.tap)((data) => {
            const response = context.switchToHttp().getResponse();
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            this.logResponse(request, response, now, data);
        }), (0, operators_1.catchError)((err) => {
            const response = context.switchToHttp().getResponse();
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            this.logResponseError(request, response, err, now);
            throw err;
        }));
    }
    logRequest(request) {
        const logMessage = `HTTP:request ${request.method} ${request.route.path}`;
        this.logger.log(logMessage);
        this.logger.debug({
            message: logMessage,
            internalPayload: {
                body: request.body,
                params: request.params,
                query: request.query,
                headers: request.headers,
            },
        });
    }
    logResponse(request, response, requestStartDate, responseData) {
        const diff = this.calculateDiffTime(requestStartDate.toISOString());
        const internalPayload = {
            status: response.statusCode,
            statusText: response.statusMessage,
            responseTime: diff,
        };
        const logMessage = `HTTP:response:${response.statusCode}: ${request.method} ${request.route.path} in ${diff}ms`;
        this.logger.log({
            message: logMessage,
            internalPayload,
        });
        this.logger.debug({
            message: logMessage,
            internalPayload: {
                ...internalPayload,
                data: responseData,
            },
        });
    }
    logResponseError(request, response, error, requestStartDate) {
        const diff = this.calculateDiffTime(requestStartDate.toISOString());
        const status = error instanceof common_1.HttpException ? error.getStatus() : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const internalPayload = {
            message: error.message,
            status,
            statusText: response.statusMessage,
            responseTime: diff,
            responseData: error instanceof common_1.HttpException ? error.getResponse() : undefined,
        };
        const logMessage = `HTTP:error:${error.message}:${status}: ${request.method} ${request.route.path} in ${diff}ms`;
        this.logger.warn({
            message: logMessage,
            internalPayload,
        });
    }
    /**
     * Расчет времени выполнения
     * @param start - Время начала
     * @static
     * @private
     */
    calculateDiffTime(start) {
        const endTime = Date.now();
        const startTime = new Date(start).getTime();
        return endTime - startTime;
    }
};
exports.RequestLogInterceptor = RequestLogInterceptor = RequestLogInterceptor_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], RequestLogInterceptor);
//# sourceMappingURL=request-log.interceptor.js.map