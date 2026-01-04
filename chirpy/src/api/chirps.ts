import type { Request, Response } from "express";
import { BadRequestError } from "./errors.js";
import { saveNewChirp } from "../lib/db/queries/chirps.js";

type Chirp = {
    body: string;
    userId: string;
}

const MAX_CHIRP_LENGTH = 140;
const BAD_WORDS = ["kerfuffle", "fornax", "sharbert"];

function validate(req: Request) {
    let chirp: Chirp = req.body;

    if (!chirp || typeof chirp.body !== "string" || typeof chirp.userId !== "string" || chirp.userId.length !== 36) {
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

    return {
        userId: chirp.userId,
        cleanedBody,
    };
}

export async function handleNewChirp(req: Request, resp: Response) {
    const input = validate(req);

    const savedChirp = await saveNewChirp({
        body: input.cleanedBody,
        userId: input.userId
    });

    resp.status(201).json({
        id: savedChirp.id,
        createdAt: savedChirp.createdAt,
        updatedAt: savedChirp.updatedAt,
        body: savedChirp.body,
        userId: savedChirp.userId
    });
}

