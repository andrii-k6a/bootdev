process.loadEnvFile();

import type { MigrationConfig } from "drizzle-orm/migrator";

export type APIConfig = {
    fileserverHits: number;
    platform: "dev" | "prod";
};

export type DBConfig = {
    url: string;
    migrationConfig: MigrationConfig;
};

export type JWTConfig = {
    defaultExpirationTimeSeconds: number;
    secret: string;
    issuer: string;
};

export type Config = {
    api: APIConfig;
    db: DBConfig;
    jwt: JWTConfig;
};

function envOrThrow(key: string): string {
    const value = process.env[key];
    if (value) {
        return value;
    }
    throw new Error(`Missing environment variable ${key}`);
}

function isPlatform(platform: string): platform is "dev" | "prod" {
    return platform === "dev" || platform === "prod";
}

const migrationConfig: MigrationConfig = {
    migrationsFolder: "./src/lib/db/generated"
};

const platform = envOrThrow("PLATFORM");
if (!isPlatform(platform)) {
    throw new Error("Invalid platform");
}

export const config: Config = {
    api: {
        fileserverHits: 0,
        platform
    },
    db: {
        url: envOrThrow("DB_URL"),
        migrationConfig
    },
    jwt: {
        defaultExpirationTimeSeconds: 3600,
        secret: envOrThrow("JWT_SECRET"),
        issuer: "chirpy",
    },
};

