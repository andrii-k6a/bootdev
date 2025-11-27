import { fetchFeed } from "../lib/rss";
import {
    findNextFeedToFetch,
    markFeedFetched
} from "../lib/db/queries/feeds";
import { createPosts } from "../lib/db/queries/posts";

export async function handleAgg(cmdName: string, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error(`usage: ${cmdName} <100ms|10s|1m|1h`);
    }

    const timeBetweenRequests = args[0];
    const interval = parseInterval(timeBetweenRequests);

    console.log(`Collecting feeds every ${timeBetweenRequests}`);

    // run the first scrape immediately
    scrapeFeeds()
        .catch(err => console.log(`Error while scraping feed: ${err instanceof Error ? err.message : err}`));

    const intervalId = setInterval(() => {
        scrapeFeeds()
            .catch(err => console.log(`Error while scraping feed: ${err instanceof Error ? err.message : err}`));
    }, interval);

    // Keep the function alive until Ctrl+C, preventing process.exit(0) in main()
    await new Promise<void>((resolve) => {
        process.on("SIGINT", () => {
            console.log("Shutting down feed aggregator...");
            clearInterval(intervalId);
            resolve();
        });
    });
}

function parseInterval(timeBetweenRequests: string): number {
    const regex = /^(\d+)(ms|s|m|h)$/;
    const multipliers = {
        'ms': 1,
        's': 1000,
        'm': 60 * 1000,
        'h': 60 * 60 * 1000
    };

    try {
        const match = timeBetweenRequests.match(regex);

        if (!match) {
            throw new Error("Failed to parse time between requests param");
        }

        const value = parseInt(match[1]);
        const unit = match[2];

        if (!isValidUnit(unit)) {
            throw new Error(`Unknown unit ${unit}`);
        }

        return value * multipliers[unit];
    } catch (err) {
        throw new Error(
            `Failed to parse time between requests param: ${err instanceof Error ? err.message : err}`
        );
    }
}

function isValidUnit(unit: string): unit is 'ms' | 's' | 'm' | 'h' {
    return unit === 'ms' || unit === 's' || unit === 'm' || unit === 'h';
}

async function scrapeFeeds() {
    const feed = await findNextFeedToFetch();

    if (!feed) {
        console.log("No feed to fetch");
        return;
    }

    await markFeedFetched(feed.id);

    const rss = await fetchFeed(feed.url);

    const posts = rss.channel.item.map(i => ({
        title: i.title,
        url: i.link,
        description: i.description,
        publishedAt: new Date(i.pubDate),
        feedId: feed.id,
    }));

    const result = await createPosts(posts);

    console.log(`${result.length} posts have been handled out of ${posts.length}`);
}

