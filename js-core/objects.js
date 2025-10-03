const person = {
    name: "Kurt",
    location: {
        country: "unknown"
    }
};

const city = person.location.city;
console.log(`Person's city is ${city}`);

// TypeError: Cannot read properties of undefined (reading 'description')
// const education = person.education.description;
const educationDesc = person.education?.description;
console.log(`Person's education: ${educationDesc}`);

