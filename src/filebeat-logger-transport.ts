import * as Transport from "winston-transport";
import {format} from "winston";
import {FilebeatLoggerUtils} from "./filebeat-logger-utils";
import {FilebeatLoggerOptions, optionDefaults} from "./filebeat-logger-options";

export class FilebeatLoggerTransport extends Transport {

    private readonly stderrLevels: string[];

    constructor(optOptions?: FilebeatLoggerOptions) {
        super();

        const options = {...optionDefaults(), ...optOptions}

        this.stderrLevels = options.stderrLevels;

        this.format = format(function(info) {
            FilebeatLoggerUtils.addEcsFields(info);
            FilebeatLoggerUtils.addEnvironmentTag(info, options.appEnvironment);
            FilebeatLoggerUtils.explodeJsonInMessage(info);
            FilebeatLoggerUtils.orderKeys(info, options.keysOrder);
            return info;
        })();
    }

    log(info: { 'log.level': string }, next: () => void): void {
        const stream = this.stderrLevels.includes(info['log.level']) ? process.stderr : process.stdout;
        stream.write(JSON.stringify(info) + '\n');
        next();
    }
}
