process.loadEnvFile();

import type { MigrationConfig } from "drizzle-orm/migrator";

export type APIConfig = {
    fileserverHits: number
}

export type DBConfig = {
    url: string;
    migrationConfig: MigrationConfig
}

export type Config = {
    api: APIConfig;
    db: DBConfig;
}

function envOrThrow(key: string): string {
    const value = process.env[key];
    if (value) {
        return value;
    }
    throw new Error(`Missing environment variable ${key}`);
}

const migrationConfig: MigrationConfig = {
    migrationsFolder: "./src/lib/db/generated"
}

export const config: Config = {
    api: {
        fileserverHits: 0

    },
    db: {
        url: envOrThrow("DB_URL"),
        migrationConfig
    }
}

