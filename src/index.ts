import * as winston from 'winston';
import {TransformableInfo} from "logform";

export class FilebeatLogger {

    public static create(
        logLevel: string,
        keysOrder: string[] = ['@timestamp', 'message', 'log.level', 'job', 'process'],
        stdErrorLevels: string[] = ['error', 'warn', 'warning'],
        appEnvironment: string|undefined = process.env.APP_ENV
    ): winston.Logger {

        return winston.createLogger({
            level: logLevel || 'warn',
            transports: [new winston.transports.Console({
                format: winston.format.printf((info) => {
                    addEcsFields(info);
                    addEnvironmentTag(info, appEnvironment);
                    explodeJsonInMessage(info);
                    orderKeys(info, keysOrder);
                    // const log = {...info};
                    // delete log['level'];
                    return JSON.stringify(info);
                }),
                stderrLevels: stdErrorLevels,
            })],
        });
    }

}

export function addEcsFields(info: TransformableInfo): void {
    info['@timestamp'] = `${new Date().toISOString()}`;
    info['log.level'] = info['level'];
}

export function addEnvironmentTag(info: TransformableInfo, appEnvironment: string|undefined = process.env.APP_ENV): void {
    if (appEnvironment) {
        const tagList = info['tags'] ? info['tags'].split(',') : [];
        tagList.push(appEnvironment);
        info['tags'] = tagList.join(', ');
    }
}

export function explodeJsonInMessage(info: TransformableInfo): void {
    const message = info['message'];
    try {
        const exploded = JSON.parse(message);
        if (exploded instanceof Object && !(exploded instanceof Array)) {
            Object.keys(exploded).forEach(function(key) {
                info[key] = exploded[key];
            });
        }
    } catch (e) {
        // JSON parse fails, therefore message cannot be exploded, carry on
    }
}

export function orderKeys(info: TransformableInfo, order: string[]): void {
    const ordered: { [key: string]: string; } = {};
    const keysOrder = order.reverse();
    const orderedKeys: string[] = Object.keys(info).sort((a, b) => {
        if (keysOrder.indexOf(a) !== keysOrder.indexOf(b)) {
            return keysOrder.indexOf(b) - keysOrder.indexOf(a);
        }
        return a.localeCompare(b);
    });

    for (const key of orderedKeys) {
        ordered[key] = info[key];
    }

    for (const key of Object.keys(info)) {
        delete info[key];
    }

    for (const [key, value] of Object.entries(ordered)) {
        info[key] = value;
    }
}
