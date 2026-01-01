import { defineConfig } from "drizzle-kit";
import { config } from "./src/config";

export default defineConfig({
    dialect: "postgresql",
    schema: "./src/lib/db/schema.ts",
    out: "./src/lib/db/generated",
    dbCredentials: {
        url: config.dbUrl
    }
});

