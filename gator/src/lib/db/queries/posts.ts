import { eq, desc } from "drizzle-orm";
import { db } from "../index";
import { feedFollows, feeds, posts } from "../schema";
import type { NewPost } from "../schema";

export async function createPosts(newPosts: Omit<NewPost, 'id' | 'createdAt' | 'updatedAt'>[]) {
    if (newPosts.length === 0) return [];

    return await db.insert(posts)
        .values(newPosts)
        .onConflictDoNothing() // do not throw error if post already exists
        .returning();
}

export async function findPostsForUser(userId: string, limit = 20) {
    return await db
        .select({
            post: posts,
            feed: {
                name: feeds.name,
                url: feeds.url,
            }
        })
        .from(posts)
        .innerJoin(feeds, eq(posts.feedId, feeds.id))
        .innerJoin(feedFollows, eq(feedFollows.feedId, feeds.id))
        .where(eq(feedFollows.userId, userId))
        .orderBy(desc(posts.publishedAt))
        .limit(limit);
}

