export interface Options {
    printTimestamp?: boolean;
    logLevel?: string;
    keysOrder?: string[];
    stderrLevels?: string[];
    appEnvironment?: string;
}

export function optionDefaults(): { printTimestamp: boolean; keysOrder: string[]; stderrLevels: string[]; appEnvironment: string | undefined } {
    return {
        printTimestamp: true,
        keysOrder: ["@timestamp", "log.level", "message"],
        stderrLevels: ["error", "warn", "warning"],
        appEnvironment: process.env["APP_ENV"],
    };
}
