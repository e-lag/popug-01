import { WinstonModuleOptions } from 'nest-winston';
/**
 * Настройки логгера
 * @param serviceName
 * @param dirEnv
 * @param debugEnv
 * @constructor
 */
export declare const LOGGER_CONFIG: (serviceName: string, dirEnv: string, debugEnv: string) => WinstonModuleOptions;
