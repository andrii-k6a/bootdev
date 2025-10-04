const person = {
    // method can access object's properties below the decalaration
    intoduction() {
        return `Hello, I am ${this.firstName} ${this.lastName}.`
    },
    firstName: "Kurt",
    lastName: "Russel",
    height: 179,
    location: {
        country: "unknown"
    },
    grow() {
        this.height++;
    },
    // arrow functions inherit the value of this keyword from their parents scope
    // 'this' is determined when the arrow function is declared
    // in this example, it refers to node.js module scope: {}
    play: (instrument) => {
        console.log(`Lady and gentelments, please welcome ${this?.firstName} with ${instrument} performance`);
    },
};

console.log(`Introduction: ${person.intoduction()}`)

// unknow property is undefined
const city = person.location.city;
console.log(`City is ${city}`);

// TypeError: Cannot read properties of undefined (reading 'description')
// const education = person.education.description;
const educationDesc = person.education?.description;
console.log(`Education: ${educationDesc}`);


console.log(`Height ${person.height}`);
// mutate object's property
person.grow();
console.log(`Height ${person.height}`);

// init property if does not exist
if (!person.balance) {
    person.balance = 0;
}
console.log(`Balance ${person.balance}`);

// dynamic keys
const nameKey = "firstName";
(function printName(person, name) {
    console.log(`Name ${person.name}`);
    console.log(`Name ${person[name]}`);
})(person, nameKey);

const firstName = "John"; // does not impact
console.log(this); // {} - node.js module scope
person.play("guitar");

