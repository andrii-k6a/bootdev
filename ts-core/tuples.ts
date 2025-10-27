const param1: [number, string] = [0, "timestamp"];
// const params: [number, string] = [0, "timestamp", 3, "id"]; // Type '[number, string, number, string]

console.log(param1);

param1.push("oops");
param1.push("param is broken");
// param.push(false); // can push string | number

console.log(param1);

const param2: readonly [number, string] = [1, "id"];

console.log(param2);

// param2.push(""); // cannot push at compile time, can at runtime though


// tuple destructing
const [index, paramName] = param2;
console.log(index, paramName);

