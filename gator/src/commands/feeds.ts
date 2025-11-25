import { createFeed, findAllFeedsWithUsers } from "../lib/db/queries/feeds";
import { createFeedFollow } from "../lib/db/queries/feed-follows";
import type { User, Feed } from "../lib/db/schema";

export async function handleAddFeed(cmdName: string, user: User, ...args: string[]) {
    const feedName = args[0];
    if (!feedName) {
        throw new Error("Missing feed name");
    }

    const url = args[1];
    if (!url) {
        throw new Error("Missing feed url");
    }

    const newFeed = await createFeed(feedName, url, user.id);
    if (!newFeed) {
        throw new Error("Failed to create new feed");
    }

    const newFeedFollow = await createFeedFollow(user.id, newFeed.id);

    console.log("Feed has been added");

    printFeed(user, newFeed);
}

function printFeed(user: User, feed: Feed) {
    console.log(user, feed);
}

export async function handleListFeeds(cmdName: string, ...args: string[]) {
    const feeds = await findAllFeedsWithUsers();

    if (feeds.length === 0) {
        console.log("No feeds found");
        return;
    }

    for (const feed of feeds) {
        console.log(`${feed.name} - ${feed.url} (User: ${feed.user.name})`);
    }
}

