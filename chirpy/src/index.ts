import express from "express";
import { handleResetMetrics, handleFileserverHits } from "./api/metrics.js";
import { handleReadiness } from "./api/health.js";
import {
    middlewareMetricsInc,
    middlewareLogResponse
} from "./api/middleware.js"

const app = express();

app.use(middlewareLogResponse);
app.use("/app", middlewareMetricsInc, express.static("./src/app"));

app.get("/healthz", handleReadiness);
app.get("/metrics", handleFileserverHits);
app.get("/reset", handleResetMetrics);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

