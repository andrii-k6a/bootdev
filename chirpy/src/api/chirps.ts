import type { Request, Response } from "express";
import type { Chirp } from "../lib/db/schema.js";
import {
    BadRequestError,
    ForbiddenError,
    NotFoundError
} from "./errors.js";
import { config } from "../config.js";
import {
    getBearerToken,
    validateJWT
} from "../lib/auth.js";
import {
    findChirpById,
    findChirps,
    saveNewChirp,
    deleteChirp,
} from "../lib/db/queries/chirps.js";

type Parameters = {
    body: string;
}

const MAX_CHIRP_LENGTH = 140;
const BAD_WORDS = ["kerfuffle", "fornax", "sharbert"];

function validate(req: Request) {
    let chirp: Parameters = req.body;

    if (!chirp || typeof chirp.body !== "string") {
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
        cleanedBody,
    };
}

function mapChirp(chirp: Chirp) {
    return {
        id: chirp.id,
        createdAt: chirp.createdAt,
        updatedAt: chirp.updatedAt,
        body: chirp.body,
        userId: chirp.userId
    };
}

export async function handleNewChirp(req: Request, resp: Response) {
    const token = getBearerToken(req);
    const userId = validateJWT(token, config.jwt.secret);

    const input = validate(req);

    const savedChirp = await saveNewChirp({
        body: input.cleanedBody,
        userId,
    });

    resp.status(201).json(mapChirp(savedChirp));
}

export async function handleFindChirps(req: Request, resp: Response) {
    const chirps = (await findChirps()).map(c => mapChirp(c));
    resp.status(200).json(chirps);
}

export async function handleFindChirp(req: Request, resp: Response) {
    const { chirpId } = req.params;

    // TODO add id validation - if it is not a valid uuid the request fails with 500 status
    const chirp = await findChirpById(chirpId);

    if (!chirp) {
        throw new NotFoundError(`Chirp not found by id ${chirpId}`);
    }

    resp.status(200).json(mapChirp(chirp));
}

export async function handleChirpDelete(req: Request, resp: Response) {
    const token = getBearerToken(req);
    const userId = validateJWT(token, config.jwt.secret);

    const { chirpId } = req.params;

    // TODO add id validation - if it is not a valid uuid the request fails with 500 status
    const chirp = await findChirpById(chirpId);

    if (!chirp) {
        throw new NotFoundError(`Chirp not found by id ${chirpId}`);
    }

    if (chirp.userId !== userId) {
        throw new ForbiddenError("You are not allowed to delete the chirp");
    }

    const deleted = await deleteChirp(chirp.id);
    if (!deleted) {
        throw new Error(`Failed to delete chirp by id ${chirpId}`);
    }

    resp.status(204).send();
}

