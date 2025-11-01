import type { State } from "./state.js";

export async function commandExplore(state: State, locationName: string) {
    if (!locationName) {
        throw new Error("Please provide location name. Example: explore pastoria-city-area");
    }
    const location = await state.pokeClient.fetchLocation(locationName);
    for (const pe of location.pokemon_encounters) {
        console.log(pe.pokemon.name);
    }
}

