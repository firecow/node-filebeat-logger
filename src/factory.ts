import * as winston from "winston";
import {Options} from "./options";
import {Transport} from "./transport";

export function create(optOptions?: Options): winston.Logger {
    const defaultLogLevel: winston.level = "info";
    return winston.createLogger({
        level: optOptions ? optOptions.logLevel || defaultLogLevel : defaultLogLevel,
        transports: [new Transport(optOptions)],
    });
}
