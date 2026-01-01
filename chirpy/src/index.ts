import type { Request, Response, NextFunction } from "express";
import express from "express";
import { handleResetMetrics, handleFileserverHits } from "./api/metrics.js";
import { handleReadiness } from "./api/health.js";
import {
    middlewareMetricsInc,
    middlewareLogResponse,
    middlewareErrorHandler
} from "./api/middleware.js"
import { handleChirpsValidation } from "./api/validator.js";

const asyncRouteErrorHandler = (handler: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // wrap the handler into resolved promise in case a handler is not async for any reason
        Promise.resolve(handler(req, res, next)).catch(next);
    };
};

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

