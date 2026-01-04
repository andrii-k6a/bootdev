import { eq } from "drizzle-orm";
import type { NewChirp } from "../schema.js";
import { chirps } from "../schema.js";
import { db } from "../index.js";

export async function findChirps() {
    return await db.select()
        .from(chirps)
        .orderBy(chirps.createdAt);
}

export async function findChirpById(id: string) {
    const [result] = await db.select()
        .from(chirps)
        .where(eq(chirps.id, id));
    return result;
}

export async function saveNewChirp(newChirp: NewChirp) {
    const [result] = await db.insert(chirps)
        .values(newChirp)
        .returning();
    return result;
}

