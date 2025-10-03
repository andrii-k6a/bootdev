let myName;
console.log(myName ?? "Annonymous") // "Anonymous"

myName = null;
console.log(myName ?? "Anonymous"); // "Anonymous"

myName = "";
console.log(myName ?? "Anonymous"); // ""

myName = "Lane";
console.log(myName ?? "Anonymous"); // "Lane"

function say(phrase) {
    console.log(phrase ?? "This is bootiful, mate!");
}

say()

