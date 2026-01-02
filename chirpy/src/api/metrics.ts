import type { Request, Response } from "express";
import { config } from "../config.js";

export async function handleFileserverHits(_: Request, response: Response) {
    response.set({ "Content-Type": "text/html; charset=utf-8" });
    response.status(200).send(adminMetricsTemplate());
}

function adminMetricsTemplate(): string {
    return `
<html>
<body>
    <h1>Welcome, Chirpy Admin</h1>
    <p>Chirpy has been visited ${config.api.fileserverHits} times!</p>
</body>
</html>
`.trim();
}

export async function handleResetMetrics(_: Request, response: Response) {
    config.api.fileserverHits = 0;
    response.status(200).send("Hits reset to 0");
}

