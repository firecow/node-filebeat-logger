import * as winston from "winston";
import {FilebeatLoggerOptions} from "./filebeat-logger-options";
import {FilebeatLoggerTransport} from "./filebeat-logger-transport";

export function create(optOptions?: FilebeatLoggerOptions): winston.Logger {
    const defaultLogLevel = 'info';
    return winston.createLogger({
        level: optOptions ? optOptions.logLevel || defaultLogLevel : defaultLogLevel,
        transports: [new FilebeatLoggerTransport(optOptions)],
    });
}
