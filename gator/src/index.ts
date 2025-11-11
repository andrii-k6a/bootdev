import { readConfig, setUser } from "./config.js";

function main() {
    setUser("Kook");
    const cfg = readConfig();
    console.log(cfg);
}

main();

