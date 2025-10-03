// https://developer.mozilla.org/en-US/docs/Glossary/Hoisting

greetings(`Welcome to the ${myLocation}`);

function greetings(msg) {
    console.log(`Greetings! ${msg}`)
}

var myLocation = "Moon";


// ****************************
// foo() // ReferenceError: Cannot access 'bar' before initialization
function foo() {
    console.log(bar)
    // const bar = "oops" // ReferenceError: Cannot access 'bar' before initialization
}
const bar = "bar"
foo()


// ****************************
const x = 1;
{
    // console.log(x); // ReferenceError
    const x = 2;
}

