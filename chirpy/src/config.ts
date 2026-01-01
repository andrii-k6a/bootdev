process.loadEnvFile();

export type APIConfig = {
    dbUrl: string,
    fileserverHits: number
}

function envOrThrow(key: string): string {
    const value = process.env[key];
    if (value) {
        return value;
    }
    throw new Error(`Missing environment variable ${key}`);
}

export const config: APIConfig = {
    dbUrl: envOrThrow("DB_URL"),
    fileserverHits: 0
}

