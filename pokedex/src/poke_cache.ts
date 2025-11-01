export type CacheEntry<T> = {
    createdAt: number;
    val: T;
};

export class Cache<T> {
    #cache = new Map<string, CacheEntry<T>>;
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(interval: number) {
        this.#interval = interval;
        this.#startReapLoop();
    }

    add(key: string, value: T) {
        this.#cache.set(key, { createdAt: Date.now(), val: value });
    }

    get(key: string) {
        return this.#cache.get(key)?.val;
    }

    #startReapLoop() {
        this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
    }

    #reap() {
        const expirationTimeout = Date.now() - this.#interval;
        for (const [key, value] of this.#cache) {
            if (value.createdAt < expirationTimeout) {
                this.#cache.delete(key);
            }
        }
    }

    stopReapLoop() {
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }
}

