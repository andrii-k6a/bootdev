import express from "express";
import { handleResetMetrics, handleFileserverHits } from "./api/metrics.js";
import { handleReadiness } from "./api/health.js";
import {
    middlewareMetricsInc,
    middlewareLogResponse
} from "./api/middleware.js"
import { handleChirpsValidation } from "./api/validator.js";

const app = express();

app.use(express.json());
app.use(middlewareLogResponse);
app.use("/app", middlewareMetricsInc, express.static("./src/app"));

app.get("/api/healthz", handleReadiness);
app.post("/api/validate_chirp", handleChirpsValidation);
app.get("/admin/metrics", handleFileserverHits);
app.post("/admin/reset", handleResetMetrics);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

