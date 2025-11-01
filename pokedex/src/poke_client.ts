import { Cache } from "./poke_cache";

export class PokeClient {
    #baseUrl = "https://pokeapi.co/api/v2";
    #cache: Cache<Locations>;

    constructor(cache: Cache<Locations>) {
        this.#cache = cache;
    }

    async fetchLocations(url: string | undefined): Promise<Locations> {
        if (!url) {
            url = `${this.#baseUrl}/location-area`;
        }

        const cache = this.#cache.get(url);
        if (cache) {
            return cache;
        }

        const response = await fetch(url);
        const payload = await response.json();
        this.#cache.add(url, payload);
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

