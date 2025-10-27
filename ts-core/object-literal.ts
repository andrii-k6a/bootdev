type User = {
    firstName: string,
    secondName: string,
    age: number
}

function greetings(user: User): void {
    if (user.age > 21) {
        console.log(`Welcome, ${user.firstName} ${user.secondName}!`);
    } else {
        console.log(`Hey, ${user.firstName} ${user.secondName}!`)
    }
}

const u1 = { firstName: "Jane", secondName: "Fonishej", age: 27 };
greetings(u1);

const u2 = { firstName: "Vick", secondName: "Aberd", age: 19, test: "test" };
greetings(u2);

// cannot have extra proprs if passing object litaral directly
// greetings({ firstName: "Vick", secondName: "Aberd", age: 19, test: "test" });

