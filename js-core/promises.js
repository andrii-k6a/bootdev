console.log("Start");
setTimeout(() => console.log("First 200ms setTimeout callback"), 200);
console.log("Point A");

const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (Math.random() < 0.5) {
            resolve("You got lucky in 100ms!");
        } else {
            // immediate termination if unhandled rejection occurs on Node v15+, a warning for older versions
            reject("It was just 100ms... Maybe next time...");
        }
    }, 100);
});

setTimeout(() => console.log("Second 50ms setTimeout callback"), 50);

// Project.reject("boom"); // it crashes the application

myPromise
    .then((msg) => console.log(`You won! ${msg}`))
    .catch((msg) => console.log(`No worries! ${msg}`));



