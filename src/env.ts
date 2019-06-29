export default class Env {
    static readonly REQUEST_SIZE_LIMIT = process.env.REQUEST_SIZE_LIMIT || "1mb";
    static readonly DEBUG_LOGGING: boolean = process.env.DEBUG_LOGGING ? !!parseInt(process.env.DEBUG_LOGGING) : true;
    static readonly NODE_ENV = process.env.NODE_ENV || "local";
}