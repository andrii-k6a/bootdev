import { createInterface } from "node:readline";
import { getCommands } from "./registry.js";

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
});

const commands = getCommands();

export function cleanInput(input: string): string[] {
    return input.toLowerCase()
        .trim()
        .split(/\s+/)
        .filter(i => i.length > 0);
};

export function startREPL() {
    rl.prompt();
    rl.on("line", line => {
        const input = cleanInput(line);
        if (input.length === 0) {
            rl.prompt();
            return;
        }

        const command = commands[input[0]];
        if (!command) {
            console.log("Unknown command");
            rl.prompt();
            return;
        }

        command.callback(commands);
        rl.prompt();
    });
};

