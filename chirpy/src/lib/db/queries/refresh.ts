import type { NewRefreshToken, RefreshToken } from "../schema.js";
import { and, eq, gt, isNull } from "drizzle-orm";
import { db } from "../index.js";
import { refreshTokens } from "../schema.js";
import { config } from "../../../config.js";

export async function findActiveRefreshToken(token: string) {
    const [result] = await db.select()
        .from(refreshTokens)
        .where(
            and(
                eq(refreshTokens.token, token),
                isNull(refreshTokens.revokedAt),
                gt(refreshTokens.expiresAt, new Date()),
            )
        )
        .limit(1);
    return result;
}

export async function saveNewRefreshToken(token: string, userId: string) {
    const [result] = await db.insert(refreshTokens)
        .values({
            token,
            userId,
            expiresAt: new Date(Date.now() + config.jwt.refreshTokenExpirationTimeout),
        })
        .returning();
    return result;
}

export async function revokeRefreshToken(token: string) {
    const result = await db.update(refreshTokens)
        .set({ revokedAt: new Date() })
        .where(eq(refreshTokens.token, token))
        .returning();
    if (result.length !== 1) {
        throw new Error("Failed to revoke refresh token");
    }
}

