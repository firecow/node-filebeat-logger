export interface FilebeatLoggerOptions {
    logLevel?: string;
    keysOrder?: string[];
    stderrLevels?: string[];
    appEnvironment?: string;
}

export function optionDefaults(): { keysOrder: string[]; stderrLevels: string[]; appEnvironment: string | undefined } {
    return {
        keysOrder: ["@timestamp", "message", "log.level"],
        stderrLevels: ["error", "warn", "warning"],
        appEnvironment: process.env["APP_ENV"],
    };
}
