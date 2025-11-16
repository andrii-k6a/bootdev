import { eq } from "drizzle-orm";
import { db } from "..";
import { users } from "../schema";

export async function createUser(name: string) {
    const [result] = await db.insert(users)
        .values({ name: name })
        .returning();
    return result;
}

export async function findFirstUser(name: string) {
    const results = await db.select()
        .from(users)
        .where(eq(users.name, name));
    return results[0];
}

export async function findUsers(name: string) {
    return await db.select()
        .from(users)
        .where(eq(users.name, name));
}

