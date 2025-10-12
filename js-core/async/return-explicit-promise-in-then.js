// return a `simple` value within then callback
Promise.resolve(1)
    .then(value => {
        console.log("first then:", value);
        return value + 1; // Same as `return Promise.resolve(value + 1)`
    })
    // newValue is just a number returned from prev then
    .then(newValue => {
        console.log("second then:", newValue);
    });

function asyncOperation(data) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`Processed: ${data}`);
        }, 100);
    });
}

Promise.resolve("initial data")
    .then(data => {
        console.log("First then:", data);
        // asyncOperation() returns a Promise<String>
        return asyncOperation(data);
    })
    .then(result => {
        console.log("Second then:", result);
    });

