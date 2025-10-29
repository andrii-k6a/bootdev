import { describe } from "node:test";
import type { CLICommand } from "./registry";

export function commandHelp(commands: Record<string, CLICommand>) {
    console.log("Welcome to the Pokedex!");
    console.log("Usage:");
    for (const commandKey in commands) {
        const command = commands[commandKey];
        console.log(`${command.name}: ${command.description}`);
    }
};

