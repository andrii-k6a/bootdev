import { Pokemon } from "./poke_client.js";
import { State } from "./state.js";

export async function commandInspect(state: State, pokemonName: string) {
    if (!pokemonName) {
        throw new Error("Please provide pokemon name. Example: inspect pickachu");
    }

    const pokemon = state.pokedex[pokemonName];

    if (!pokemon) {
        console.log(`You have not caught ${pokemonName} yet`);
        return;
    }

    console.log(formatPokemon(pokemon));
}

function formatPokemon(pokemon: Pokemon) {
    let output = `Name: ${pokemon.name}\n`;
    output += `Height: ${pokemon.height}\n`;
    output += `Weight: ${pokemon.weight}\n`;

    output += `Stats:\n`;
    for (const stat of pokemon.stats) {
        output += `  -${stat.stat.name}: ${stat.base_stat}\n`;
    }

    output += `Types:\n`;
    for (const type of pokemon.types) {
        output += `  - ${type.type.name}\n`;
    }

    return output;
}

