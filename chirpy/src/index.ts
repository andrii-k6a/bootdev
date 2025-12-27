import express from "express";
import type { Request, Response } from "express";

const PORT = 8080;
const app = express();

app.use("/app", express.static("./src/app"));

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

app.get("/healthz", handleReadiness);

async function handleReadiness(request: Request, response: Response) {
    response.set({ "Content-Type": "text/plain; charset=utf-8" });
    response.status(200).send("OK");
}
