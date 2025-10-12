console.log("Start");

setTimeout(() => console.log("100ms setTimeout callback"), 100);

setTimeout(() => console.log("200ms setTimeout callback"), 200);

console.log("Point A");

// Promise constructor function runs synchronously so you can resolve/reject it immediately
const myPromise = new Promise((resolve, reject) => {

    console.log("Promise callback start...");

    setTimeout(() => {
        if (Math.random() < 0.5) {
            console.log("You got lucky in 100ms!");
            resolve(777);
        } else {
            // immediate script termination happens if unhandled rejection occurs on Node v15+, a warning for older versions
            console.log("It was just 100ms... Maybe next time...");
            reject(0);
        }
    }, 100);

    console.log("Promise callback end");
});

setTimeout(() => console.log("50ms setTimeout callback"), 50);

// once promice is resolved or rejected it adds its following then or catch callback to the microtask queue
myPromise
    .then((prize) => console.log(`You won $${prize}!`))
    .catch((prize) => console.log(`No worries! $${prize} is not a minus.`));

