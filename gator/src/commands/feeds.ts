import { readConfig } from "../config";
import { createFeed, findAllFeedsWithUsers } from "../lib/db/queries/feeds";
import { findFirstUser } from "../lib/db/queries/users";
import type { User, Feed } from "../lib/db/schema";

export async function handleAddFeed(cmdName: string, ...args: string[]) {
    const feedName = args[0];
    if (!feedName) {
        throw new Error("Missing feed name");
    }

    const url = args[1];
    if (!url) {
        throw new Error("Missing feed url");
    }

    const currentUser = readConfig().currentUserName;
    const user = await findFirstUser(currentUser);

    if (!user) {
        throw new Error(`User not found: ${currentUser}`);
    }

    const newFeed = await createFeed(feedName, url, user.id);
    if (!newFeed) {
        throw new Error("Failed to create new feed");
    }

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

