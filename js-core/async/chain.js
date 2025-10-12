const myPromise = new Promise((resolve, reject) => {

    setTimeout(() => {
        if (Math.random() < 0.5) {
            console.log("You got LUCKY!");
            resolve(777);
        } else {
            console.log("Do it AGAIN!");
            // Good practice: Always reject with Error objects to maintain consistency and get proper stack traces
            reject(0);
        }
    }, 10);

});

// Important Points:
// • .catch() doesn't end the chain - it handles errors and lets execution continue
// • Each .then() receives the return value from the previous step
// • Throwing an error skips to the next .catch() in the chain
// • First .catch() in a chain is called if promise is rejected, it can be invoked with any value, not just errors
// • The chain flows sequentially, but only executes the relevant success/error handlers
myPromise
    .then(res => {
        console.log(`1st then callback ${res}`);
        return res;
    })
    .then(res => {
        console.log(`2sd then callback (dangerous) ${res}`);
        if (res == 0) {
            throw new Error("NEVER the case because rejected promise skips all then() till first catch()");
        }
        return res;
    })
    .then(res => {
        console.log(`3rd then callback ${res}`);
        return res;
    })
    .catch(res => {
        console.log(`Oops! 1st catch! Catch param is ${res}. Not an error obj.`);
    })
    // the following then is always called. It will be after all prev then() or catch()
    .then(() => {
        console.log(`4th then callback (dangerous) - ALWAYS - after all prev then() or catch()`);
        if (Math.random() < 0.5) {
            throw new Error("Shame");
        }
        console.log("GOLD");
    })
    .catch(err => {
        console.log(`Oops! 2nd catch! ${err.message}!`);
    });

