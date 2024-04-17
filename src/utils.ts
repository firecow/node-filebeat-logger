export class Utils {

    static addTimestamp(info: any): void {
        info["@timestamp"] = `${new Date().toISOString()}`;
    }

    static addLogLevel(info: any): void {
        info["log.level"] = info["level"];
        delete info["level"];
    }

    static expandError(info: any): void {
        const err: any = info["error"] || info["err"];

        info["error.message"] = err.message;
        info["error.stack_trace"] = err.stack;
        info["error.type"] = err.name;
        info["error.code"] = err.code;

        delete info["error"];
        delete info["err"];
    }

    static expandRequest(info: any): void {
        const req: any = info["request"] || info["req"];
        if (!req) return;

        if (req.headers) {
            const protocol = (req.protocol ?? req.headers["x-forwarded-proto"] ?? "https").replace(":", "");
            const url = new URL(req.url, `${protocol}://${req.headers.host}`);
            info["url.path"] = url.pathname;
            info["url.full"] = url.href;
            info["url.domain"] = url.host;
            info["url.query"] = url.search.substring(1);
            info["url.scheme"] = url.protocol.slice(0, -1);
        }
        if (req.method && typeof req.method === "string") {
            info["http.request.method"] = req.method.toUpperCase();
        }

        delete info["request"];
        delete info["req"];
    }

    static expandResponse(info: any): void {
        const res: any = info["response"] || info["res"];
        if (!res) return;

        info["http.response.status_code"] = res.statusCode;

        delete info["response"];
        delete info["res"];
    }

    static addEnvironmentTag(info: any, appEnvironment: string | undefined = process.env["APP_ENV"]): void {
        if (appEnvironment) {
            const tagList = info["tags"] ? info["tags"].split(",") : [];
            tagList.push(appEnvironment);
            info["tags"] = tagList.join(", ");
        }
    }

    static explodeJsonInMessage(info: any): void {
        const message = info["message"] ?? "";
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

    static orderKeys(info: any, keysOrder: string[]): void {
        const ordered: any = {};
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
