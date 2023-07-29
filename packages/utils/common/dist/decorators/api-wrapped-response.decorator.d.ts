import { ClassType } from './class-type.interface';
/**
 * Ответ 200
 * @param dataDto
 * @constructor
 */
export declare const ApiOkWrappedResponse: <DataDto extends ClassType<unknown>>(dataDto: DataDto) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol | undefined, descriptor?: TypedPropertyDescriptor<Y> | undefined) => void;
/**
 * Ответ 201
 * @param dataDto
 * @constructor
 */
export declare const ApiCreatedWrappedResponse: <DataDto extends ClassType<unknown>>(dataDto: DataDto) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol | undefined, descriptor?: TypedPropertyDescriptor<Y> | undefined) => void;
