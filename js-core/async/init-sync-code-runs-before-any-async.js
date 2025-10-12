// Note: syncronous code always runs to completion before any asnchronous callbacks execute, even if those operations are already resolved.

async function doNothing() {
    console.log("Doing nothing in async function...");
}

doNothing() // doNothing is being exuceted as any other sync code because there is no await inside
    .then(() => console.log("After doing nothing... Also, after all sync code!"));

console.log("Start executing CPU intensive task syncroniously...");

for (let i = 0; i < 3_000_000_000; i++) { } // intensive CPU operation

console.log("CPU intensive task in sync mode has been completed!");

