export interface ILogger {

    debug(summary: string, detail?: any, traceId?: string): void;
    info(summary: string, detail?: any, traceId?: string): void;
    warning(summary: string, detail?: any, traceId?: string): void;
    error(summary: string, detail?: any, traceId?: string): void;
    startTimer(timerId: string): void;
    logTime(timerId: string): void;

}