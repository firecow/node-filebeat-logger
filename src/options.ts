import * as winston from "winston";

export interface Options {
    printTimestamp?: boolean;
    logLevel?: winston.level;
    keysOrder?: string[];
    stderrLevels?: string[];
    appEnvironment?: string;
}

export function optionDefaults(): { printTimestamp: boolean; keysOrder: string[]; stderrLevels: string[]; appEnvironment: string | undefined } {
    return {
        printTimestamp: false,
        keysOrder: ["@timestamp", "message", "log.level"],
        stderrLevels: ["error", "warn", "warning"],
        appEnvironment: process.env["APP_ENV"],
    };
}
