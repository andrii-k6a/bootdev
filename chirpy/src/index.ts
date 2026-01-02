import type { Request, Response, NextFunction } from "express";

import express from "express";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";

import { handleResetMetrics, handleFileserverHits } from "./api/metrics.js";
import { handleReadiness } from "./api/health.js";
import {
    middlewareMetricsInc,
    middlewareLogResponse,
    middlewareErrorHandler
} from "./api/middleware.js"
import { handleChirpsValidation } from "./api/validator.js";
import { config } from "./config.js";

const asyncRouteErrorHandler = (handler: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // wrap the handler into resolved promise in case a handler is not async for any reason
        Promise.resolve(handler(req, res, next)).catch(next);
    };
};

const migrationClient = postgres(config.db.url, { max: 1 });
await migrate(drizzle(migrationClient), config.db.migrationConfig);
await migrationClient.end();

const app = express();

app.use(express.json());
app.use(middlewareLogResponse);
app.use("/app", middlewareMetricsInc, express.static("./src/app"));

app.get("/api/healthz", asyncRouteErrorHandler(handleReadiness));
app.post("/api/validate_chirp", asyncRouteErrorHandler(handleChirpsValidation));
app.get("/admin/metrics", asyncRouteErrorHandler(handleFileserverHits));
app.post("/admin/reset", asyncRouteErrorHandler(handleResetMetrics));

// Error handling middleware needs to be defined last, after other app.use() and routes.
app.use(middlewareErrorHandler);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

