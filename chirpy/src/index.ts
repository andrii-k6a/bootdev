import type { Request, Response, NextFunction } from "express";

import express from "express";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";

import { handleLogin } from "./api/login.js";
import { handleNewUser } from "./api/users.js";
import {
    handleFindChirp,
    handleFindChirps,
    handleNewChirp,
} from "./api/chirps.js";
import { handleReset } from "./api/reset.js";
import { handleFileserverHits } from "./api/metrics.js";
import { handleReadiness } from "./api/health.js";
import {
    middlewareMetricsInc,
    middlewareLogResponse,
    middlewareErrorHandler
} from "./api/middleware.js"
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
app.post("/api/login", asyncRouteErrorHandler(handleLogin));
app.post("/api/users", asyncRouteErrorHandler(handleNewUser));
app.post("/api/chirps", asyncRouteErrorHandler(handleNewChirp));
// Route order matters: /chirps must come before /chirps/:id to avoid conflicts
app.get("/api/chirps", asyncRouteErrorHandler(handleFindChirps));
app.get("/api/chirps/:chirpId", asyncRouteErrorHandler(handleFindChirp));
app.get("/admin/metrics", asyncRouteErrorHandler(handleFileserverHits));
app.post("/admin/reset", asyncRouteErrorHandler(handleReset));

// Error handling middleware needs to be defined last, after other app.use() and routes.
app.use(middlewareErrorHandler);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

