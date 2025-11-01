import { Cache } from "./poke_cache";

export class PokeClient {
    #baseUrl = "https://pokeapi.co/api/v2";
    #locationsCache: Cache<Locations>;
    #locationCache: Cache<Location>;
    #pokemonInfoCache: Cache<Pokemon>;

    constructor(locationsCache: Cache<Locations>, locationCache: Cache<Location>, pokemonInfoCache: Cache<Pokemon>) {
        this.#locationsCache = locationsCache;
        this.#locationCache = locationCache;
        this.#pokemonInfoCache = pokemonInfoCache;
    }

    async fetchLocations(url: string | undefined): Promise<Locations> {
        if (!url) {
            url = `${this.#baseUrl}/location-area`;
        }

        const cache = this.#locationsCache.get(url);
        if (cache) {
            return cache;
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to get locations: ${response.status} ${response.statusText}`);
        }
        const payload = await response.json();

        this.#locationsCache.add(url, payload);

        return payload;
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const cache = this.#locationCache.get(locationName);
        if (cache) {
            return cache;
        }

        const url = `${this.#baseUrl}/location-area/${locationName}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to get location: ${response.status} ${response.statusText}`);
        }
        const payload = await response.json();

        this.#locationCache.add(url, payload);

        return payload;
    }

    async fetchPokemon(pokemonName: string): Promise<Pokemon> {
        const url = `${this.#baseUrl}/pokemon/${pokemonName}`;

        const cache = this.#pokemonInfoCache.get(pokemonName);
        if (cache) {
            return cache;
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to get pokemon info: ${response.status} ${response.statusText}`);
        }
        const payload = await response.json();

        return payload;
    }
}

export type Locations = {
    count: number;
    next: string;
    previous: string;
    results: {
        name: string;
        url: string;
    }[];
}

export type Location = {
    pokemon_encounters: {
        pokemon: {
            name: string;
        }
    }[];
}

export type Pokemon = {
    id: number;
    name: string;
    base_experience: number;
}

