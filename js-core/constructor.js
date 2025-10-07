// regular function for object creation
function createReplicant(model) {
    return {
        model: model,

        feel(emotion) {
            console.log(`${this.model} feels ${emotion}`);
        }
    };
}

const nexus4 = createReplicant("nexus4");
console.log(nexus4);
nexus4.feel("something new");


// Constructors, by convention, start with a capital letter and are named for the type of object they create
function Replicant(model) {
    this.model = model; // this refers to an object created by a constructor function which is a function that called with 'new'
    this.feel = function(emotion) {
        console.log(`${this.model} feels ${emotion}`);
    }
    // no need for return statement, if a function is called with 'new', it returns object automatically
}

// A constructor is just a function called using the new keyword.
// When you call a constructor, it will:
// - create a new object
// - bind this to the new object, so you can refer to this in your constructor code
// - run the code in the constructor
// - return the new object.
const rachael = new Replicant("nexus7");
console.log(rachael);
rachael.feel("love");


// fooling around with `new`
function bar() {
    // if the function is called without new, this would refer to the context in which it's called, for example it could be a global object
    this.foo = "what this references to if the function is called without new?";
    return "bar function returns bar";
}
console.log(bar());
console.log(this.foo); // undefined as this does not refer to global object in Node.js strict mode
console.log(global.foo);
console.log(globalThis.foo); // cross platform property for accessing global object - global/window/self
const b = new bar();
console.log(b);
console.log(b.foo);

