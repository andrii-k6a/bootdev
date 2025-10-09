const miscellaneous = [true, 7, "adamantium"];

console.log(miscellaneous);
console.log(`Array length: ${miscellaneous.length}`);

console.log();
// probably it's not the best practice to use `in` for arrays as designed to iterate over object's properties, and potentially might be issues with the order in some cases
for (const index in miscellaneous) {
    console.log(`${index} : ${miscellaneous[index]}; Warning! Index type is ${typeof index}.`);
}

const fooBar = { foo: "bar" };
miscellaneous.push(fooBar);

console.log();
for (const item of miscellaneous) {
    console.log(item);
}

console.log();
const nested = [miscellaneous, 100, 110, 111];
console.log(nested);
const spread = [...miscellaneous, 100, 110, 111];
console.log(spread);

console.log();
console.log(`Has adamantium? ${miscellaneous.includes("adamantium")}`);
console.log(miscellaneous.includes(fooBar)); // true
console.log(miscellaneous.includes({ foo: "bar" })); // false because it's a different object in memory

console.log();
const animals = ["ant", "bison", "camel", "duck", "elephant"];
console.log(animals.slice());       // ["ant", "bison", "camel", "duck", "elephant"]
console.log(animals.slice(2));      // ["camel", "duck", "elephant"]
console.log(animals.slice(2, 4));   // ["camel", "duck"]
console.log(animals.slice(1, 99));  // ["bison", "camel", "duck", "elephant"]
console.log(animals.slice(-2));     // ["duck", "elephant"]
console.log(animals.slice(2, -1));  // ["camel", "duck"]
console.log(animals.slice(3, 1));   // []

console.log();
const nums = [2, 0, 4, 8];

const [a1, b1, c1, d1] = nums;
console.log(a1, b1, c1, d1);

const [first] = nums;
console.log(first);

const [firstNub, ...rest] = nums;
console.log(first, rest); // rest is an array

const [a2, b2, c2, d2, ...emptyArr] = nums;
console.log(a2, b2, c2, d2, emptyArr);

const [a3, b3, c3, d3, undef1, undef2] = nums;
console.log(a3, b3, c3, d3, undef1, undef2);

console.log(double(nums));
function double([a, b, c, d]) {
    return [a * 2, b * 2, c * 2, d * 2];
}

