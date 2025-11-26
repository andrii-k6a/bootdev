import { eq, asc, sql } from "drizzle-orm";
import { db } from "..";
import { feeds } from "../schema";

export async function createFeed(feedName: string, url: string, userId: string) {
    const [result] = await db.insert(feeds)
        .values({
            name: feedName,
            url,
            userId
        })
        .returning();
    return result;
}

export async function findAllFeedsWithUsers() {
    return await db.query.feeds.findMany({
        with: {
            user: true,
        },
    });
}

export async function findFeedByUrl(url: string) {
    const results = await db.select()
        .from(feeds)
        .where(eq(feeds.url, url));
    return results[0];
}

export async function findNextFeedToFetch() {
    const results = await db.select()
        .from(feeds)
        .orderBy(sql`${feeds.lastFetchedAt} ASC NULLS FIRST`)
        // .orderBy(asc(feeds.lastFetchedAt)) // an alternative option since Postgres handles NULLS FIRST for ASC ordering by default
        .limit(1);
    return results[0];
}

export async function markFeedFetched(feedId: string) {
    const [result] = await db.update(feeds)
        .set({
            lastFetchedAt: new Date(),
            updatedAt: new Date(), // not necessary since the db auto update it with on $onUpdate action in schema
        })
        .where(eq(feeds.id, feedId))
        .returning();
    return result;
}

