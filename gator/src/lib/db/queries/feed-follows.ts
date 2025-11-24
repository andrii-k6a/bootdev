import { db } from "..";
import { feedFollows } from "../schema";

export async function createFeedFollow(userId: string, feedId: string) {
    const [newFeedFollow] = await db.insert(feedFollows)
        .values({
            userId,
            feedId,
        })
        .returning();

    return await db.query.feedFollows.findFirst({
        where: (feedFollows, { eq }) => eq(feedFollows.id, newFeedFollow.id),
        with: {
            user: true,
            feed: true,
        }
    });
}

export async function findAllFeedFollowsWithDetails() {
    return await db.query.feedFollows.findMany({
        with: {
            user: true,
            feed: true,
        }
    });
}

export async function getFeedFollowsForUser(userId: string) {
    return await db.query.feedFollows.findMany({
        where: (feedFollows, { eq }) => eq(feedFollows.userId, userId),
        with: {
            user: true,
            feed: true,
        }
    });
}

