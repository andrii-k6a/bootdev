import { State } from "./state.js";

export async function commandPokedex(state: State) {
    const pokemons = Object.keys(state.pokedex);
    if (pokemons.length === 0) {
        console.log("Your Pokedex is empty.");
        return;
    }

    let res = "Your Pokedex:\n";
    for (const name of pokemons) {
        res += ` - ${name}\n`;
    }

    console.log(res);
}

