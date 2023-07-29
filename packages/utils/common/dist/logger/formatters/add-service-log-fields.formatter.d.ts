import * as winston from 'winston';
interface ServiceLogFieldsOptions {
    serviceName: string;
}
export declare function addServiceLogFieldsFormatter(options: ServiceLogFieldsOptions): winston.Logform.Format;
export {};
