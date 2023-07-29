"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiCreatedWrappedResponse = exports.ApiOkWrappedResponse = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
/**
 * Декоратор для оборачивания в формат ответ apps-dto
 * @param dataDto
 * @constructor
 */
function responseOptions(dataDto) {
    return {
        schema: {
            allOf: [
                {
                    properties: {
                        data: { $ref: (0, swagger_1.getSchemaPath)(dataDto) },
                        meta: {
                            type: 'object',
                            properties: {
                                success: {
                                    type: 'boolean',
                                    default: true,
                                },
                            },
                        },
                    },
                },
            ],
        },
    };
}
/**
 * Ответ 200
 * @param dataDto
 * @constructor
 */
// eslint-disable-next-line @typescript-eslint/naming-convention,@typescript-eslint/explicit-module-boundary-types,@typescript-eslint/explicit-function-return-type
const ApiOkWrappedResponse = (dataDto) => (0, common_1.applyDecorators)((0, swagger_1.ApiExtraModels)(dataDto), (0, swagger_1.ApiOkResponse)(responseOptions(dataDto)));
exports.ApiOkWrappedResponse = ApiOkWrappedResponse;
/**
 * Ответ 201
 * @param dataDto
 * @constructor
 */
// eslint-disable-next-line @typescript-eslint/naming-convention,@typescript-eslint/explicit-module-boundary-types,@typescript-eslint/explicit-function-return-type
const ApiCreatedWrappedResponse = (dataDto) => (0, common_1.applyDecorators)((0, swagger_1.ApiExtraModels)(dataDto), (0, swagger_1.ApiCreatedResponse)(responseOptions(dataDto)));
exports.ApiCreatedWrappedResponse = ApiCreatedWrappedResponse;
//# sourceMappingURL=api-wrapped-response.decorator.js.map