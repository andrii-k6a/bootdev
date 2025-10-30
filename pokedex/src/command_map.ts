import type { State } from "./state.js";

export async function commandMapForward(state: State) {
    const response = await state.pokeClient.fetchLocations(state.nextLocationsUrl);
    state.nextLocationsUrl = response.next;
    state.prevLocationsUrl = response.previous;

    for (const location of response.results) {
        console.log(location.name);
    }
}

export async function commandMapBackward(state: State) {
    if (!state.prevLocationsUrl) {
        console.log("You are on the first page");
        return;
    }

    const response = await state.pokeClient.fetchLocations(state.prevLocationsUrl);
    state.nextLocationsUrl = response.next;
    state.prevLocationsUrl = response.previous;

    for (const location of response.results) {
        console.log(location.name);
    }
}

