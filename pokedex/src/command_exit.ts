import type { State } from "./state.ts";

export function commandExit(state: State) {
    console.log("Closing the Pokedex... Goodbye!");
    state.interface.close();
    process.exit(0);
};

