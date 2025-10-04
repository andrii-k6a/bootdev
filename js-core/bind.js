const user = {
    firstName: "Lil",
    lastName: "Kook",
    fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}

console.log(user.fullName());

function greeting(msg, nameCallback) {
    return `${msg}. ${nameCallback()}.`;
}
console.log(greeting("Glad to see you all", user.fullName));

const boundFullName = user.fullName.bind(user);
console.log(greeting("Glad to see you all", boundFullName));

