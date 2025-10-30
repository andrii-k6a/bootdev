import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js"
import { createInterface } from "node:readline";
import type { Interface } from "node:readline";

export type State = {
    interface: Interface;
    commands: Record<string, CLICommand>;
}

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => void;
};

export function initState(): State {
    return {
        interface: createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: "Pokedex > ",
        }),
        commands: getCommands()
    };
}

function getCommands(): Record<string, CLICommand> {
    return {
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp
        },
        exit: {
            name: "exit",
            description: "Exit the Pokedex",
            callback: commandExit
        }
    };
};

