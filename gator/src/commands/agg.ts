import { fetchFeed } from "../lib/rss";

export async function handleAgg(cmdName: string) {
    const feed = await fetchFeed("https://www.wagslane.dev/index.xml");
    console.log(JSON.stringify(feed, null, 2));
}

