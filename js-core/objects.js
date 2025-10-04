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

// dynamic keys
const nameKey = "firstName";
(function printName(person, name) {
    console.log(`Name ${person.name}`);
    console.log(`Name ${person[name]}`);
})(person, nameKey);

console.log(person);

