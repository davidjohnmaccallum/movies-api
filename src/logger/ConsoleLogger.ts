import { ILogger } from "./ILogger";
import Env from "../env";

export class ConsoleLogger implements ILogger {
    
    debug(summary: string, detail?: any, traceId?: string): void {
        if (!Env.DEBUG_LOGGING) return;
        console.log("Debug", summary, detail, traceId);
    }    
    
    info(summary: string, detail?: any, traceId?: string): void {
        console.log("Info", summary, detail, traceId);
    }
    
    warning(summary: string, detail?: any, traceId?: string): void {
        console.log("Warning", summary, detail, traceId);
    }
    
    error(summary: string, detail?: any, traceId?: string): void {
        console.log("Error", summary, detail, traceId);
    }
    
    startTimer(timerId: string): void {
        console.time("Performance " + timerId);
    }
    
    logTime(timerId: string): void {
        console.timeEnd("Performance " + timerId);
    }

}
