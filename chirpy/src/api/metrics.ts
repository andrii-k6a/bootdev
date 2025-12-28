import type { Request, Response } from "express";
import { config } from "../config.js";

export async function handleFileserverHits(_: Request, response: Response) {
    response.set({ "Content-Type": "text/plain; charset=utf-8" });
    response.status(200).send(`Hits: ${config.fileserverHits}`);
}

export async function handleResetMetrics(_: Request, response: Response) {
    config.fileserverHits = 0;
    response.status(200).send("Hits reset to 0");
}

