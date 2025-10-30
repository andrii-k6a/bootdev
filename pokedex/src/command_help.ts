import { describe } from "node:test";
import type { State } from "./state.ts";

export function commandHelp(state: State) {
    const commands = state.commands;

    console.log("Welcome to the Pokedex!");
    console.log("Usage:");
    for (const commandKey in commands) {
        const command = commands[commandKey];
        console.log(`${command.name}: ${command.description}`);
    }
};

