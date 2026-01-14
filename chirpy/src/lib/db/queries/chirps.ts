import { asc, desc, eq } from "drizzle-orm";
import type { NewChirp } from "../schema.js";
import { chirps } from "../schema.js";
import { db } from "../index.js";

export async function findChirps(ascOrder: boolean = true) {
    return await db.select()
        .from(chirps)
        .orderBy(ascOrder ? asc(chirps.createdAt) : desc(chirps.createdAt));
}

export async function findChirpsByAuthorId(authorId: string, ascOrder: boolean = true) {
    return await db.select()
        .from(chirps)
        .where(eq(chirps.userId, authorId))
        .orderBy(ascOrder ? asc(chirps.createdAt) : desc(chirps.createdAt));
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

export async function deleteChirp(chirpId: string) {
    const [result] = await db.delete(chirps)
        .where(eq(chirps.id, chirpId))
        .returning();
    return result;
}

