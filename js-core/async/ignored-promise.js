console.log("Start");

const promise = new Promise((resolved, rejected) => {
    // do nothing
});

console.log("Promise created");

async function hello() {
    console.log("About to await promise");
    // await returns control to the caller with code below added as a callback, like:
    // return promise.then(() => console.log("Never happens..."));
    await promise;
    console.log("Never happens...");
}

console.log("Calling async function...");

hello();

// the scripts exits because there is no active handles, threfore existing promises will not get settled and no sense to wait for it
console.log("The end");

