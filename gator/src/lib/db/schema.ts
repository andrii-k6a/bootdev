import { pgTable, timestamp, uuid, text, unique } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
    name: text("name").notNull().unique(),
});

export type User = typeof users.$inferSelect;

export const usersRelations = relations(users, ({ many }) => ({
    feeds: many(feeds),
    feedFollows: many(feedFollows),
}));

export const feeds = pgTable("feeds", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
    lastFetchedAt: timestamp("last_fetched_at"),
    name: text("name").notNull(),
    url: text("url").notNull().unique(),
    userId: uuid("user_id")
        .references(() => users.id, { onDelete: "cascade" })
        .notNull()
});

export type Feed = typeof feeds.$inferSelect;

export const feedsRelations = relations(feeds, ({ one, many }) => ({
    user: one(users, {
        fields: [feeds.userId],
        references: [users.id],
    }),
    feedFollows: many(feedFollows)
}));

export const feedFollows = pgTable(
    "feed_follows",
    {
        id: uuid("id").primaryKey().defaultRandom().notNull(),
        createdAt: timestamp("created_at").notNull().defaultNow(),
        updatedAt: timestamp("updated_at")
            .notNull()
            .defaultNow()
            .$onUpdate(() => new Date()),
        userId: uuid("user_id")
            .references(() => users.id, { onDelete: "cascade" })
            .notNull(),
        feedId: uuid("feed_id")
            .references(() => feeds.id, { onDelete: "cascade" })
            .notNull()
    },
    (t) => ({ unq: unique().on(t.userId, t.feedId) })
);

export type FeedFollows = typeof feedFollows.$inferSelect;

export const feedFollowsRelations = relations(feedFollows, ({ one }) => ({
    user: one(users, {
        fields: [feedFollows.userId],
        references: [users.id]
    }),
    feed: one(feeds, {
        fields: [feedFollows.feedId],
        references: [feeds.id]
    })
}));

export const posts = pgTable(
    "posts",
    {
        id: uuid("id").primaryKey().defaultRandom().notNull(),
        createdAt: timestamp("created_at").notNull().defaultNow(),
        updatedAt: timestamp("updated_at")
            .notNull()
            .defaultNow()
            .$onUpdate(() => new Date()),
        title: text("title").notNull(),
        url: text("url").unique().notNull(),
        description: text("description"),
        publishedAt: timestamp("published_at"),
        feedId: uuid("feed_id")
            .references(() => feeds.id, { onDelete: "cascade" })
            .notNull()
    }
);

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;

export const postsRelations = relations(posts, ({ one }) => ({
    feed: one(feeds, {
        fields: [posts.feedId],
        references: [feeds.id]
    }),
}));

