console.log(Object.prototype);
console.log(Object.prototype.__proto__);

const o = {};
console.log(o.__proto__); // by default object's prototype is set to Object.prototype
console.log(o.__proto__.__proto__); // Object.prototype' prototype is set to null

console.log()

function bar() {
    this.foo = "this refers to God knows what";
}

const b1 = bar;
const b2 = new bar();
// Object.create() creates a new object which __proto__ property refers to the passed object
const b3 = Object.create(b2);

process.stdout.write("b1.proto is: ");
console.log(b1.__proto__);
process.stdout.write("b1.proto.proto is: ");
console.log(b1.__proto__.__proto__);
process.stdout.write("b1.proto.proto.proto is: ");
console.log(b1.__proto__.__proto__.__proto__);

process.stdout.write("b2.proto is: ");
console.log(b2.__proto__);
process.stdout.write("b2.proto.proto is: ");
console.log(b2.__proto__.__proto__);
process.stdout.write("b2.proto.proto.proto is: ");
console.log(b2.__proto__.__proto__.__proto__);

console.log(`b3.__proto__ === b2: ${b3.__proto__ === b2}`)
process.stdout.write("b3.proto is: ");
console.log(b3.__proto__);
process.stdout.write("b3.proto.proto is: ");
console.log(b3.__proto__.__proto__);
process.stdout.write("b3.proto.proto.proto is: ");
console.log(b3.__proto__.__proto__.__proto__);
process.stdout.write("b3.proto.proto.proto.proto is: ");
console.log(b3.__proto__.__proto__.__proto__.__proto__);

console.log();

const lang = {
    country: "US",

    hello() {
        console.log(`Hello from ${this.country}`);
    }
}

const greetings = Object.create(lang);

console.log("Another way to get objects's prototype is by using Object.getPrototypeOf(obj)");
console.log(Object.getPrototypeOf(greetings));
console.log(Object.getPrototypeOf(greetings) === lang);

greetings.welcome = function() {
    console.log(`Welcome to the ${this.country}`);
}

console.log(greetings.country);
greetings.hello();
greetings.welcome();

console.log()

const obj = {};
console.log(obj.prototype); // undefined - no such property on an object

function f() {
    console.log("f has been called...");
}
const newF = new f();

// all functions have `prototype` property
// When you call a function as a constructor, this property's value is set as the prototype of the newly constructed object (by convention, in the property named __proto__)
console.log(f.prototype);
console.log(newF.__proto__);
console.log(newF.__proto__ === f.prototype);
console.log(newF.prototype); // undefined because it is an object - not a function

console.log();

function Person(name) {
    this.name = name;

    this.greetings = function(name) {
        console.log(`Hello, ${this.name}`);
    }
}

const p = {
    location: "Mars"
}

const jule = new Person("Jule");
console.log(jule);
console.log(jule.location);

// Object.assign(target, source) copies properties from source objects to target object
Object.assign(Person.prototype, p);

const pablo = new Person("Pablo");
console.log(pablo); // it shows only object's own properties, not inherited props form prototype chain
console.log(pablo.location);
process.stdout.write("Pablo's prototype is: ");
console.log(Object.getPrototypeOf(pablo));
console.log(Object.getPrototypeOf(pablo) === p); // this is false because the props are copied, but they are different objects

console.log(Person.prototype);
console.log(Person.prototype.name); // undefynied because the property is available on instances itself, not its prototype
console.log(Person.prototype.location);

