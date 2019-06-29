import { Request, Response, NextFunction } from "express";
import Env from "./env";

export default function (err: any, req: Request, res: Response, next: NextFunction) {

    const body: any = {
        message: err.message
    };
    // Only return stack trace if in debug mode. It is a security risk.
    if (Env.DEBUG_LOGGING) body.stack = err.stack;
    res.status(500).json(body);

}