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

