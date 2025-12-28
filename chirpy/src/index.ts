import express from "express";
import type { NextFunction, Request, Response } from "express";
import { config } from "./config.js";

function middlewareLogResponse(request: Request, response: Response, next: NextFunction) {
    response.on("finish", () => {
        if (response.statusCode !== 200) {
            console.log(`[NON-OK] ${request.method} ${request.url} - Status: ${response.statusCode}`);
        }
    });
    next();
}

function middlewareMetricsInc(request: Request, response: Response, next: NextFunction) {
    config.fileserverHits++;
    next();
}

const app = express();

app.use("/app", middlewareMetricsInc, express.static("./src/app"));

app.use(middlewareLogResponse);

async function handleReadiness(request: Request, response: Response) {
    response.set({ "Content-Type": "text/plain; charset=utf-8" });
    response.status(200).send("OK");
}

app.get("/healthz", handleReadiness);

async function handleFileserverHits(request: Request, response: Response) {
    response.set({ "Content-Type": "text/plain; charset=utf-8" });
    response.status(200).send(`Hits: ${config.fileserverHits}`);
}

app.get("/metrics", handleFileserverHits);

async function handleResetMetrics(request: Request, response: Response) {
    config.fileserverHits = 0;
    response.status(200).send("Hits reset to 0");
}

app.get("/reset", handleResetMetrics);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

