import type { Request, Response } from "express";

export async function handleReadiness(request: Request, response: Response) {
    response.set({ "Content-Type": "text/plain; charset=utf-8" });
    response.status(200).send("OK");
}

