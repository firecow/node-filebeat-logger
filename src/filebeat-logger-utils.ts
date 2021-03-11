export class FilebeatLoggerUtils {

    static addEcsFields(info: { [key: string]: string|undefined }): void {
        info['@timestamp'] = `${new Date().toISOString()}`;
        info['log.level'] = info['level'];
        delete info['level'];
    }

    static expandError(info: { [key: string]: string }): void {
        const err: unknown = info['error'] || info['err'];
        if (err instanceof Error) {
            info['error.message'] = err.message;
            if (err.stack) {
                info['error.stack_trace'] = err.stack;
            }
            delete info['error'];
            delete info['err'];
        }
    }

    static addEnvironmentTag(info: { [key: string]: string }, appEnvironment: string | undefined = process.env['APP_ENV']): void {
        if (appEnvironment) {
            const tagList = info['tags'] ? info['tags'].split(',') : [];
            tagList.push(appEnvironment);
            info['tags'] = tagList.join(', ');
        }
    }

    static explodeJsonInMessage(info: { [key: string]: string }): void {
        const message = info['message'] ?? "";
        try {
            const exploded = JSON.parse(message);
            if (exploded instanceof Object && !(exploded instanceof Array)) {
                Object.keys(exploded).forEach(function (key) {
                    info[key] = exploded[key];
                });
            }
        } catch (e) {
            // JSON parse fails, therefore message cannot be exploded, carry on
        }
    }

    static orderKeys(info: { [key: string]: string|undefined }, keysOrder: string[]): void {
        const ordered: { [key: string]: string|undefined; } = {};
        const reverseKeysOrder = keysOrder.slice().reverse();
        const orderedKeys: string[] = Object.keys(info).sort((a, b) => {
            return reverseKeysOrder.indexOf(b) - reverseKeysOrder.indexOf(a);
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
}
