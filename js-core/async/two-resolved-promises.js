console.log("Start");

const p1 = Promise.resolve(1).then(val => console.log(`This is ${val}`));

console.log("After p1, but before p2");

const p2 = Promise.resolve(2).then(val => console.log(`This is ${val}`));

console.log("The end");

