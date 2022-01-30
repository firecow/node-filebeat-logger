import * as WinstonTransport from "winston-transport";
import {format} from "winston";
import {Utils} from "./utils";
import {Options, optionDefaults} from "./options";

export class Transport extends WinstonTransport {

    private readonly stderrLevels: string[];

    constructor(optOptions?: Options) {
        super();

        const options = {...optionDefaults(), ...optOptions};

        this.stderrLevels = options.stderrLevels;

        this.format = format(function (info) {
            if (options.printTimestamp) {
                Utils.addTimestamp(info);
            }
            Utils.addLogLevel(info);
            Utils.addEnvironmentTag(info, options.appEnvironment);
            Utils.expandError(info);
            Utils.expandRequest(info);
            Utils.expandResponse(info);
            Utils.explodeJsonInMessage(info);
            Utils.orderKeys(info, options.keysOrder);
            return info;
        })();
    }

    log(info: { "log.level": string }, next: () => void): void {
        const stream = this.stderrLevels.includes(info["log.level"]) ? process.stderr : process.stdout;
        stream.write(JSON.stringify(info) + "\n");
        next();
    }
}
