import type { NewChirp } from "../schema.js";
import { chirps } from "../schema.js";
import { db } from "../index.js";

export async function saveNewChirp(newChirp: NewChirp) {
    const [result] = await db.insert(chirps)
        .values(newChirp)
        .returning();
    return result;
}

