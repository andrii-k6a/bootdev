import type { Request, Response } from "express";
import { BadRequestError } from "./errors.js";

type Chirp = {
    body: string;
}

const MAX_CHIRP_LENGTH = 140;
const BAD_WORDS = ["kerfuffle", "fornax", "sharbert"];

export async function handleChirpsValidation(req: Request, resp: Response) {
    let chirp: Chirp = req.body;

    if (!chirp || typeof chirp.body !== 'string') {
        throw new BadRequestError("Invalid body! Fix it and try again!");
    }

    if (chirp.body.length > MAX_CHIRP_LENGTH) {
        throw new BadRequestError(`Chirp is too long. Max length is ${MAX_CHIRP_LENGTH}`);
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

