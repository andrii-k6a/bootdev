async function alarm(ms) {
    await new Promise(resolve => setTimeout(resolve, ms));
    console.log(`${ms}ms has passed`);
    return `${ms}ms alarm!`;
}

const a1 = alarm(1000);
const a2 = alarm(500);

// Promise.all() - fails fast (rejects if any promise rejects).
// If any promise is rejected, the other operations continue to run, but their outcomes are not available via the return value of Promise.all(). This may cause unexpected state or behavior. 
Promise.all([a1, a2])
    .then((results) => {
        console.log("Promise.all:");
        console.log(results);
    });

Promise.all([a1, a2, Promise.reject(new Error("fail"))])
    .then((results) => {
        console.log("Promise.all:");
        console.log(results);
    })
    .catch(err => {
        console.log(`Promise.all fail fast, it rejects itself once any included promise get rejected. Error: ${err.message}`);
    });

// Promise.allSettled() - waits for all promises regardless of success/failure
Promise.allSettled([a1, a2])
    .then((results) => {
        console.log("Promise.all:");
        console.log(results);
    });

Promise.allSettled([a1, a2, Promise.reject(new Error("fail"))])
    .then((results) => {
        console.log("Promise.all:");
        console.log(results);
    });

// Promise.any() fulfills when any of the input's promises fulfills, with this first fulfillment value. 
// It rejects when all of the input's promises reject (including when an empty iterable is passed), with an AggregateError containing an array of rejection reasons.
Promise.any([a1, a2, Promise.reject(new Error("fail"))])
    .then((value) => {
        console.log(`Promise.any: ${value}`);
    });

Promise.any([Promise.reject(new Error("fail"))])
    .then((value) => {
        console.log(`Promise.any: ${value}`);
    })
    .catch(err => {
        console.log(`Promise.any caught error: ${err.message}`);
    })

// Promise.race() it fulfills if the first promise to settle is fulfilled, and rejects if the first promise to settle is rejected. 
// The returned promise remains pending forever if the iterable passed is empty. 
// If the iterable passed is non-empty but contains no pending promises, the returned promise is still asynchronously (instead of synchronously) settled.
Promise.race([a1, a2])
    .then(val => console.log(`Promise.race ${val}`));

