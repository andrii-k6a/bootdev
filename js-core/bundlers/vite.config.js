import { defineConfig } from "vite";

export default defineConfig({
    build: {
        lib: {
            fileName: "hello-vite-bundler",
            entry: "main.js",
            formats: ["es"],
        },
    },
});
