console.log("Here we go!");

const emptyPromise = new Promise((resolved, rejected) => {
});

// Warning: Detected unsettled top-level await at file:///Users/path/bootdev/js-core/async/broken-await.js:9
// await emptyPromise;
// ^
await emptyPromise;

console.log("Never gonna be here...");

