export class PokeClient {
    #baseUrl = "https://pokeapi.co/api/v2";

    async fetchLocations(url: string | undefined): Promise<Locations> {
        if (!url) {
            url = `${this.#baseUrl}/location-area`;
        }
        const response = await fetch(url);
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

