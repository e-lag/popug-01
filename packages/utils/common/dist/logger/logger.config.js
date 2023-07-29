"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOGGER_CONFIG = void 0;
const nest_winston_1 = require("nest-winston");
const winston = __importStar(require("winston"));
const formatters_1 = require("./formatters");
/**
 * Проверка наличия настройки
 * @param envValue
 * @param envErrMsg
 */
const checkEnvs = (envValue, envErrMsg) => {
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
const LOGGER_CONFIG = (serviceName, dirEnv, debugEnv) => {
    const logDirName = process.env[dirEnv] ?? '../logs';
    const appLoggerDebug = process.env[debugEnv];
    checkEnvs(logDirName, dirEnv);
    checkEnvs(appLoggerDebug, `${debugEnv}=on|off`);
    return {
        transports: [
            new winston.transports.Console({
                format: winston.format.combine(winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }), 
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                (0, formatters_1.addRequestIdFormatter)(), (0, formatters_1.removeInternalPayloadStringFormatter)(), winston.format.ms(), nest_winston_1.utilities.format.nestLike(serviceName, {
                    prettyPrint: true,
                    colors: true,
                })),
                level: appLoggerDebug === 'on' ? 'debug' : 'info',
            }),
            new winston.transports.File({
                dirname: logDirName,
                filename: serviceName + '.log',
                format: winston.format.combine(winston.format.timestamp(), (0, formatters_1.addServiceLogFieldsFormatter)({ serviceName }), (0, formatters_1.addRequestIdFormatter)(), winston.format.logstash()),
                level: 'debug',
            }),
        ],
    };
};
exports.LOGGER_CONFIG = LOGGER_CONFIG;
//# sourceMappingURL=logger.config.js.map