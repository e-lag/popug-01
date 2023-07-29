"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var LongRequestInterceptor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LongRequestInterceptor = void 0;
const nestjs_rabbitmq_1 = require("@golevelup/nestjs-rabbitmq");
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
/**
 * Формирует WARNING в логах при запросах длиннее 1500 мс
 */
let LongRequestInterceptor = exports.LongRequestInterceptor = LongRequestInterceptor_1 = class LongRequestInterceptor {
    /** логгер */
    logger = new common_1.Logger(LongRequestInterceptor_1.name);
    /**
     * Обработчик
     * @param context  ExecutionContext
     * @param next CallHandler
     */
    intercept(context, next) {
        const maxTimeForNormalResponse = 1500;
        const shouldSkip = (0, nestjs_rabbitmq_1.isRabbitContext)(context);
        if (shouldSkip) {
            return next.handle();
        }
        const now = Date.now();
        return next.handle().pipe((0, operators_1.tap)(() => {
            const requestTime = Date.now() - now;
            if (requestTime > maxTimeForNormalResponse) {
                const request = context.switchToHttp().getRequest();
                this.logger.warn(`HTTP:${request.method} ${request.route.path} took ${requestTime}ms`);
            }
        }));
    }
};
exports.LongRequestInterceptor = LongRequestInterceptor = LongRequestInterceptor_1 = __decorate([
    (0, common_1.Injectable)()
], LongRequestInterceptor);
//# sourceMappingURL=long-request.interceptor.js.map