fetchRandomJoke((joke) => {
    console.log(joke);

    translateJoke(joke, (translatedJoke) => {
        console.log(translatedJoke);

        postJoke(translatedJoke, () => {
            console.log("Joke posted successfully!");
        });
    });
});

function fetchRandomJoke(cb) {
    console.log("Fetching a joke...");
    const joke = "Knock, knock."
    cb(joke);
}

function translateJoke(joke, cb) {
    console.log(`Translating a joke: ${joke}`);
    let translated = "Unknown translation";
    if (joke === "Knock, knock.") {
        translated = "Toc, toc.";
    }
    cb(translated);
}

function postJoke(joke, cb) {
    console.log(`Posting a joke: ${joke}`);
    cb();
}



console.log("\n*** AVOID THE CALLBACK HELL USING ASYNC/AWAIT ***\n");

async function fetchRandomJokeAsync() {
    console.log("Fetching a joke...");
    for (let i = 0; i < 2_000_000_000; i++) { }
    return "Knock, knock.";
}

async function translateJokeAsync(joke) {
    console.log(`Translating a joke: ${joke}`);
    let translated = "Unknown translation";
    if (joke === "Knock, knock.") {
        translated = "Toc, toc.";
    }
    return translated;
}

async function postJokeAsync(joke, cb) {
    console.log(`Posting a joke: ${joke}`);
}

// Note: init syncronous code always runs to completion before any asnchronous callbacks execute, even if those operations are already resolved.

// Even async functions calls run synchronously until encounter an await statement!
await fetchRandomJokeAsync()
    // `then/catch` callbacks on settled promises immediately go to the microtask queue and wait for the next event loop tick
    .then(joke => translateJokeAsync(joke))
    .then(translatedJoke => postJokeAsync(translatedJoke));

