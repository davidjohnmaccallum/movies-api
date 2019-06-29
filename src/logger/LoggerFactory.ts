import { ILogger } from "./ILogger";
import { ConsoleLogger } from "./ConsoleLogger";

export class LoggerFactory {
    
    static _instance: ILogger = new ConsoleLogger();

    static enableTestMode() {
        // Do nothing
    }

    static instance(): ILogger {
        return this._instance;
    }

}