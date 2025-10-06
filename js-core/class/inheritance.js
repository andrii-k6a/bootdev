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

