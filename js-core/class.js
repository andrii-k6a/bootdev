class Band {
    #compensation;
    constructor(name, members, genre, compensation) {
        this.name = name;
        this.members = members;
        this.genre = genre;
        this.#compensation = compensation;
        this.tipCounter = 0; // intentionally public
    }

    tip(percent) {
        this.tipCounter++;

        if (this.tipCounter > 0 && this.tipCounter % 10 === 0) {
            this.#increaseCompensation(1);
        }

        const coef = percent / 100;
        return `Thanks for ${(this.#compensation.amount / this.members.length) * coef} ${this.#compensation.currency}!`;
    }

    #increaseCompensation(percent) {
        const coef = percent / 100;
        const newComp = this.#compensation.amount + this.#compensation.amount * coef;
        this.#compensation.amount = newComp;
    }
}

console.log(new Band("unknonw"));

const band = new Band(
    "Snakes From The Moon",
    ["Alex Mimho", "Tina Droykie", "Ducle Telyche"],
    "jazz",
    {
        amount: 15,
        currency: "XYZ"
    }
);

console.log(band);
console.log(band.compensation) // undefined
// console.log(band.#compensation) // SyntaxError: Private field '#compensation' must be declared in an enclosing class

console.log(band.tip(10));
band.tipCounter = 9;
console.log(band.tip(10));
// console.log(band.#increaseCompensation(99)); // SynatxError

