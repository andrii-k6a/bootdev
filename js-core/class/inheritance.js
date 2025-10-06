class Creature {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }
}

class Pigeon extends Creature {
    makeNoise() {
        console.log(`'coo coo...' says ${this.name}`); // parent's props are accessible
    }

    fly(destination) {
        console.log(`${this.name} flies to ${destination}...`);
    }
}

const p = new Pigeon("Alan", "city pegion");
console.log(p);
console.log(p.description);
p.makeNoise();

class AngryPigeon extends Creature {
    // method override
    makeNoise() {
        console.log(`COOO COO COOOOO!!! says angry ${this.name}`);
    }

    // no method overloading, it's still override
    fly() {
        console.log("Not enough energy to fly...");
    }

    // the last definition wins
    fly(speed, distance) {
        console.log(`Searching for food within ${distance}km with ${speed}km/hour speed.`);
    }
}

const ap = new AngryPigeon("Bert", "hungry pegion");
console.log(ap);
ap.makeNoise();
// all methods calls the last definition of fly method that expect two params - speed and distance
ap.fly();
ap.fly("Central Park");
ap.fly(10, 3);

class Content {
    constructor(title) {
        this.title = title;
    }

    format() {
        return this.title.toUpperCase();
    }

    summary() {
        return this.title;
    }
}

class Article extends Content {
    constructor(title, releaseDate) {
        super(title); // Must call super constructor in derived class before accessing 'this' or returning from derived constructor, otherwise ReferenceError at runtime
        this.title = title;
        this.releaseDate = releaseDate;
    }

    format() {
        return `${super.format()}, released: ${this.releaseDate}`;
    }

    summary() {
        return "not implemented";
    }

    overview() {
        // need super or this to call parent's func, just calling summary() results in ReferenceError
        return super.summary(); // calling parent's impl
    }
}

const a = new Article("Birds in heaven", "1968");
console.log(a);
console.log(a.format());
console.log(a.overview());

