"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WrapResponseInterceptor = void 0;
const nestjs_rabbitmq_1 = require("@golevelup/nestjs-rabbitmq");
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const success_response_wrapper_1 = require("./success-response.wrapper");
/**
 * Оборачивает ответ в формат ответа из apps-dto
 */
let WrapResponseInterceptor = exports.WrapResponseInterceptor = class WrapResponseInterceptor {
    intercept(context, next) {
        if ((0, nestjs_rabbitmq_1.isRabbitContext)(context)) {
            return next.handle();
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return next.handle().pipe((0, operators_1.map)((response) => new success_response_wrapper_1.SuccessResponse(response)));
    }
};
exports.WrapResponseInterceptor = WrapResponseInterceptor = __decorate([
    (0, common_1.Injectable)()
], WrapResponseInterceptor);
//# sourceMappingURL=wrap-response.interceptor.js.map