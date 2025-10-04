const person = {
    // method can access object's properties below the decalaration
    intoduction() {
        return `Hello, I am ${this.firstName} ${this.lastName}.`
    },
    firstName: "Kurt",
    lastName: "Russel",
    location: {
        country: "unknown"
    },
};

const city = person.location.city;
console.log(`Person's city is ${city}`);

// TypeError: Cannot read properties of undefined (reading 'description')
// const education = person.education.description;
const educationDesc = person.education?.description;
console.log(`Person's education: ${educationDesc}`);

console.log(`Introduction: ${person.intoduction()}`)

