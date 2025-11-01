import { commandMapForward, commandMapBackward } from "./command_map.js";
import { commandHelp } from "./command_help.js"
import { commandExit } from "./command_exit.js";
import { createInterface } from "node:readline";
import { PokeClient } from "./poke_client.js";
import { Cache } from "./poke_cache.js";
import type { Interface } from "node:readline";

export type State = {
    interface: Interface;
    commands: Record<string, CLICommand>;
    pokeClient: PokeClient;
    nextLocationsUrl?: string;
    prevLocationsUrl?: string;
}

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => Promise<void>;
};

export function initState(): State {
    const CACHE_EXPIRATION_TIMEOUT = 10000;
    return {
        interface: createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: "Pokedex > ",
        }),
        commands: getCommands(),
        pokeClient: new PokeClient(new Cache(CACHE_EXPIRATION_TIMEOUT)),
    };
}

function getCommands(): Record<string, CLICommand> {
    return {
        map: {
            name: "map",
            description: "It displays the names of 20 location areas in the Pokemon world. Each subsequent call to map should display the next 20 locations, and so on.",
            callback: commandMapForward
        },
        mapb: {
            name: "mapb",
            description: "It's similar to the map command, however, instead of displaying the next 20 locations, it displays the previous 20 locations. It's a way to go back.",
            callback: commandMapBackward
        },
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp
        },
        exit: {
            name: "exit",
            description: "Exit the Pokedex",
            callback: commandExit
        },
    };
};

