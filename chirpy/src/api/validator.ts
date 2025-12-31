import type { Request, Response } from "express";

type Chirp = {
    body: string;
}

const MAX_CHIRP_LENGTH = 140;

export async function handleChirpsValidation(req: Request, resp: Response) {
    let chirp: Chirp = req.body;

    if (!chirp || typeof chirp.body !== 'string') {
        resp.status(400).json({ error: "Invalid body" });
        return;
    }

    if (chirp.body.length > MAX_CHIRP_LENGTH) {
        resp.status(400).json({ error: "Chirp is too long" });
        return;
    }

    resp.status(200).json({ valid: true });
}

