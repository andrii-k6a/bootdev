import type { NextFunction, Request, Response } from "express";
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
    config.fileserverHits++;
    next();
}

