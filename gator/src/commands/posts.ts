import type { User } from "../lib/db/schema";
import { findPostsForUser } from "../lib/db/queries/posts";

export async function handleBrowse(cmdName: string, user: User, ...args: string[]) {
    let limit = 10;
    if (args.length === 1) {
        limit = parseInt(args[0]);
    }

    const posts = await findPostsForUser(user.id, limit);

    if (posts.length === 0) {
        console.log("No posts found");
        return;
    }

    for (let post of posts) {
        console.log(` * (${user.name}) ${post.feed.name}: ${post.post.title}`);
    }
}

