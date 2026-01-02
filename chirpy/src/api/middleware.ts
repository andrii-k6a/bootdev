import type { NextFunction, Request, Response } from "express";
import { HttpError } from "./errors.js";
import { config } from "../config.js";

export function middlewareLogResponse(request: Request, response: Response, next: NextFunction) {
    response.on("finish", () => {
        if (response.statusCode >= 300) {
            console.log(`[NON-OK] ${request.method} ${request.url} - Status: ${response.statusCode}`);
        }
    });
    next();
}

export function middlewareMetricsInc(request: Request, response: Response, next: NextFunction) {
    config.api.fileserverHits++;
    next();
}

export function middlewareErrorHandler(err: Error, request: Request, response: Response, next: NextFunction) {
    let status = 500;
    let msg = "Pooped!";

    if (err instanceof HttpError) {
        status = err.statusCode;
        msg = err.message;
    }

    if (status >= 500) {
        console.log(err.message);
    }

    response.status(status).json({ error: msg });

    // Passes the error to the default express error handler. It may not be called if do not want to see stacktraces in the console.
    next(err);
}

