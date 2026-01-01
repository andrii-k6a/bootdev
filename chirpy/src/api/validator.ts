import type { Request, Response } from "express";

type Chirp = {
    body: string;
}

const MAX_CHIRP_LENGTH = 140;
const BAD_WORDS = ["kerfuffle", "fornax", "sharbert"];

export async function handleChirpsValidation(req: Request, resp: Response) {
    let chirp: Chirp = req.body;

    if (!chirp || typeof chirp.body !== 'string') {
        resp.status(400).json({ error: "Invalid body! Fix it and try again!" });
        return;
    }

    if (chirp.body.length > MAX_CHIRP_LENGTH) {
        // just to test error handler middleware works
        throw new Error("Chirp exceeded the max length");
        // resp.status(400).json({ error: "Chirp is too long" });
        // return;
    }

    const cleanedBody = chirp.body.split(" ")
        .map(w => {
            if (BAD_WORDS.includes(w.toLowerCase())) {
                return "****";
            }
            return w;
        })
        .join(" ");

    resp.status(200).json({ cleanedBody });
}

