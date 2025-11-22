import { XMLParser } from "fast-xml-parser";

export type RSSFeed = {
    channel: {
        title: string;
        link: string;
        description: string;
        item: RSSItem[];
    }
}

export type RSSItem = {
    title: string;
    link: string;
    description: string;
    pubDate: string;
}

export async function fetchFeed(feedUrl: string): Promise<RSSFeed> {
    const resp = await fetch(feedUrl, {
        headers: {
            "User-Agent": "gator",
            "Accept": "application/rss+xml"
        }
    });

    if (!resp.ok) {
        throw new Error(`Failed to fetch feed: HTTP ${resp.status} ${resp.statusText}`);
    }

    const data = await resp.text();
    const parser = new XMLParser();
    const parsed = parser.parse(data);
    return validateRSS(parsed);
}

function validateRSS(parsed: any): RSSFeed {
    const channel = parsed.rss?.channel;

    if (!channel) {
        throw new Error("Invalid RSS");
    }

    if (!channel.title || !channel.link || !channel.description || !channel.item) {
        throw new Error("Missing required data in RSS");
    }

    // If RSS contains a single item, it might not be wrapped into list
    const items: any[] = Array.isArray(channel.item) ? channel.item : [channel.item];

    const rssItems: RSSItem[] = [];

    for (const item of items) {
        if (!item.title || !item.link || !item.description || !item.pubDate) {
            continue;
        }

        rssItems.push({
            title: item.title,
            link: item.link,
            description: item.description,
            pubDate: item.pubDate
        });
    }

    return {
        channel: {
            title: channel.title,
            link: channel.link,
            description: channel.description,
            item: rssItems
        }
    };
}

