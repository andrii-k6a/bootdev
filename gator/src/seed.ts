import { handleReset } from "./commands/reset";
import { handleRegister } from "./commands/users";
import { handleAddFeed } from "./commands/feeds";
import { findFirstUser } from "./lib/db/queries/users";

const TEST_USER = "gator-test-user";

const RSS_FEEDS = [
    { name: "TechCrunch", url: "https://techcrunch.com/feed/" },
    { name: "Hacker News", url: "https://news.ycombinator.com/rss" },
    { name: "Boot.dev Blog", url: "https://blog.boot.dev/index.xml" },
];

async function seed() {
    try {
        console.log("Starting seed process...\n");

        console.log("1. Resetting database...");
        await handleReset("reset");
        console.log("✓ Database reset complete\n");

        console.log("2. Registering test user...");
        await handleRegister("register", TEST_USER);
        console.log("✓ Test user registered\n");

        const user = await findFirstUser(TEST_USER);
        if (!user) {
            throw new Error("Failed to find test user after registration");
        }

        console.log("3. Adding RSS feeds...");
        for (const feed of RSS_FEEDS) {
            console.log(`   Adding ${feed.name}...`);
            await handleAddFeed("addfeed", user, feed.name, feed.url);
        }
        console.log("✓ All feeds added\n");

        console.log("✓ Seed process completed successfully!");
        console.log(`\nTest user "${TEST_USER}" has been created and is following:`);
        for (const feed of RSS_FEEDS) {
            console.log(`  - ${feed.name} (${feed.url})`);
        }
    } catch (err) {
        if (err instanceof Error) {
            console.error(`❌ Seed process failed: ${err.message}`);
        } else {
            console.error(`❌ Seed process failed: ${err}`);
        }
        process.exit(1);
    }
}

await seed();
process.exit(0);
