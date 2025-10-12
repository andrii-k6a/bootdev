// It is important to always return promises from `then` callbacks, even if the promise always resolves to undefined. If the previous handler started a promise but did not return it, there's no way to track its settlement anymore, and the promise is said to be "floating".

async function doSomething() {
    console.log("Doing stuff...");
    return "https://jsonplaceholder.typicode.com/todos/1";
}

doSomething()
    .then((url) => {
        // Missing `return` keyword in front of fetch(url).
        fetch(url); // orphant promise, current callback result will be treated as resolved promise with no value
    })
    .then((result) => {
        console.log(result);
        // result is undefined, because nothing is returned from the previous
        // handler. There's no way to know the return value of the fetch()
        // call anymore, or whether it succeeded at all.
    });

doSomething()
    .then((url) => {
        return fetch(url);
    })
    .then((result) => {
        console.log(result);
    });

