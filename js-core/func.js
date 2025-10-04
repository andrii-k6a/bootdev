function dog(bark) {
    bark();
}

// passing an anonymous function as a param
dog(function() {
    console.log("bark");
});

// "IIFE" (Immediately Invoked Function Expression).
const result = function(text) {
    return text.length;
}("mushrooms");
console.log(result);

// Parentheses force expression context for anonymous function at statement start
(function(text) {
    console.log("dude has been called");
    return text.length;
})("dude");

function addFunc(x, y) {
    return x + y;
}

const addFuncAsVar = function(x, y) {
    return x + y;
}

const addFuncAsArrow = (x, y) => x + y;

console.log(addFunc(3, 7));
console.log(addFuncAsVar(3, 7));
console.log(addFuncAsArrow(3, 7));

console.log("****")
function doMeth(x, y) {
    const sum = x + y;
    const diff = x - y;
    const product = x * y;
    const quotient = x / y;
    // return sum, diff, product, quotient; // it returns just the last one - quotient. The rest are just ingnored with no errors
    return {
        sum,
        diff,
        product,
        quotient
    };
};
console.log(doMeth(3, 5));

