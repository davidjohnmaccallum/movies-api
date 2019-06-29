export default class Env {
    static readonly REQUEST_SIZE_LIMIT = process.env.REQUEST_SIZE_LIMIT || "1mb";
    static readonly NODE_ENV = process.env.NODE_ENV || "local";
}