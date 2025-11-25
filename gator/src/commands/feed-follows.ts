import type { User } from "../lib/db/schema";
import { findFeedByUrl } from "../lib/db/queries/feeds";
import {
    createFeedFollow,
    getFeedFollowsForUser,
} from "../lib/db/queries/feed-follows";

export async function handleFollow(cmdName: string, user: User, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <feed_url>`);
    }

    const feedURL = args[0];
    const feed = await findFeedByUrl(feedURL);
    if (!feed) {
        throw new Error(`Feed not found: ${feedURL}`);
    }

    const ff = await createFeedFollow(user.id, feed.id);

    console.log(`Feed follow created:`);
    console.log(`* User: ${ff?.user.name}`);
    console.log(`* Feed: ${ff?.feed.name}`);
}

export async function handleListFeedFollows(cmdName: string, user: User, ...args: string[]) {
    const feedFollows = await getFeedFollowsForUser(user.id);
    if (feedFollows.length === 0) {
        console.log(`No feed follows found for this user.`);
        return;
    }

    console.log(`Feed follows for user %s:`, user.id);
    for (let ff of feedFollows) {
        console.log(`* %s`, ff.feed.name);
    }
}

