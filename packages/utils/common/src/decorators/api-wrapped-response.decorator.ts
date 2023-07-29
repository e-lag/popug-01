import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiExtraModels, ApiOkResponse, ApiResponseOptions, getSchemaPath } from '@nestjs/swagger';

import { ClassType } from './class-type.interface';

/**
 * Декоратор для оборачивания в формат ответ apps-dto
 * @param dataDto
 * @constructor
 */
function responseOptions<DataDto extends ClassType>(dataDto: DataDto): ApiResponseOptions {
  return {
    schema: {
      allOf: [
        {
          properties: {
            data: { $ref: getSchemaPath(dataDto) },
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
export const ApiOkWrappedResponse = <DataDto extends ClassType>(dataDto: DataDto) =>
  applyDecorators(ApiExtraModels(dataDto), ApiOkResponse(responseOptions(dataDto)));

/**
 * Ответ 201
 * @param dataDto
 * @constructor
 */
// eslint-disable-next-line @typescript-eslint/naming-convention,@typescript-eslint/explicit-module-boundary-types,@typescript-eslint/explicit-function-return-type
export const ApiCreatedWrappedResponse = <DataDto extends ClassType>(dataDto: DataDto) =>
  applyDecorators(ApiExtraModels(dataDto), ApiCreatedResponse(responseOptions(dataDto)));
