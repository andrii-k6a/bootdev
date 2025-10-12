console.log("What a beatiful day!..");

// UnhandledPromiseRejection: This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch().
Promise.reject("boom"); // it crashes the application on Node v15+

console.log("It's all over!");

