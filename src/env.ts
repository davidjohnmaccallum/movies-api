/**
 * This class allows us to set defaults for missing environment variables. I do this 
 * because it allows developers to clone the repo and get started working on the code
 * immediately without having to set up environment variables on their developer
 * laptops.
 * 
 * When deploying into downstream environments (dev, staging, prod) these variables
 * would be set by the build system.
 */
export default class Env {
    static readonly REQUEST_SIZE_LIMIT = process.env.REQUEST_SIZE_LIMIT || "1mb";
    static readonly DEBUG_LOGGING: boolean = process.env.DEBUG_LOGGING ? !!parseInt(process.env.DEBUG_LOGGING) : true;
    static readonly NODE_ENV = process.env.NODE_ENV || "local";
}