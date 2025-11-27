import { eq, desc } from "drizzle-orm";
import { db } from "../index";
import { feedFollows, feeds, posts } from "../schema";
import type { NewPost } from "../schema";

export async function createPost(newPost: Omit<NewPost, 'id' | 'createdAt' | 'updatedAt'>) {
    const [result] = await db.insert(posts)
        .values(newPost)
        .onConflictDoNothing() // do not throw error if post already exists
        .returning();
    return result;
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

