import type { State } from "./state.js";

export async function commandCatch(state: State, pokemonName: string) {
    if (!pokemonName) {
        throw new Error("Please provide pokemon name. Example: catch pikachu");
    }

    console.log(`Throwing a Pokeball at ${pokemonName}...`);

    const pokemon = await state.pokeClient.fetchPokemon(pokemonName);

    const exp = pokemon.base_experience;

    let chance;
    if (exp < 100) {
        chance = 0.2;
    } else if (exp < 200) {
        chance = 0.5;
    } else {
        chance = 0.8;
    }

    if (Math.random() > chance) {
        state.pokedex[pokemonName] = pokemon;
        console.log(`${pokemonName} was caught!`);
    } else {
        console.log(`${pokemonName} escaped!`);
    }
}
