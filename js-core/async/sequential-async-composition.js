const increment = async (x) => x + 1;
const double = async (x) => x * 2;
const square = async (x) => x * x;

const x = await Promise.resolve(1)
    .then(increment)
    .then(double)
    .then(square);

console.log(x);


// Equivalent
await[increment, double, square]
    .reduce((accumulator, current) => accumulator.then(current), Promise.resolve(1))
    .then(result => console.log(result));


// Reusable equivalent
const apply = (accumulator, current) => accumulator.then(current);

const composeAsync = (...funcs) =>
    (init) => funcs.reduce(apply, Promise.resolve(init));


const composed = composeAsync(increment, double, square);

const result = await composed(1);

console.log(result);


// succint equivalent with async/await
let acc = 1;
for (const func of [increment, double, square]) {
    acc = await func(acc);
}
console.log(acc);

