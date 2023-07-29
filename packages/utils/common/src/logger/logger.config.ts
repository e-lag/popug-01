import {utilities, WinstonModuleOptions} from 'nest-winston';
import * as winston from 'winston';

import {addRequestIdFormatter, addServiceLogFieldsFormatter, removeInternalPayloadStringFormatter,} from './formatters';

/**
 * Проверка наличия настройки
 * @param envValue
 * @param envErrMsg
 */
const checkEnvs = (envValue: unknown, envErrMsg: string): void => {
    if (!envValue) {
        throw new Error(`ENV: ${envErrMsg} not found. Check '.env' file or server variables.`);
    }
};

/**
 * Настройки логгера
 * @param serviceName
 * @param dirEnv
 * @param debugEnv
 * @constructor
 */
export const LOGGER_CONFIG = (serviceName: string, dirEnv: string, debugEnv: string): WinstonModuleOptions => {
    const logDirName = process.env[dirEnv] ?? '../logs';
    const appLoggerDebug = process.env[debugEnv];
    checkEnvs(logDirName, dirEnv);
    checkEnvs(appLoggerDebug, `${debugEnv}=on|off`);
    return {
        transports: [
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss.SSS'}),
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    addRequestIdFormatter(),
                    removeInternalPayloadStringFormatter(),
                    winston.format.ms(),
                    utilities.format.nestLike(serviceName, {
                        prettyPrint: true,
                        colors: true,
                    }),
                ),
                level: appLoggerDebug === 'on' ? 'debug' : 'info',
            }),
            new winston.transports.File({

                dirname: logDirName,
                filename: serviceName + '.log',
                format: winston.format.combine(
                    winston.format.timestamp(),
                    addServiceLogFieldsFormatter({serviceName}),
                    addRequestIdFormatter(),
                    winston.format.logstash(),
                ),
                level: 'debug',
            }),
        ],
    };
};
