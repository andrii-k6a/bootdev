class Creature {
    static creaturesCounter = 0; // cannot access it through an instance
    constructor(description) {
        this.description = description;
        Creature.creaturesCounter++;
    }

    say() {
        if (Creature.creaturesCounter === 1) {
            console.log("I'm lonely...");
        } else if (Creature.creaturesCounter === 2) {
            console.log("There is someone else!");
        } else {
            console.log(`There are ${Creature.creaturesCounter} creatures.`);
        }
    }

    static areThereAnyCreatures() {
        return Creature.creaturesCounter > 0;
    }
}

console.log(`Creatures counter ${Creature.creaturesCounter}`);
console.log(Creature.areThereAnyCreatures());

const pigeon = new Creature("huge pigeon");
console.log(`Creatures counter ${Creature.creaturesCounter}`);
console.log(pigeon.description);
pigeon.say();

const butterfly = new Creature("colorful butterfly");
console.log(`Creatures counter ${Creature.creaturesCounter}`);
console.log(butterfly.description);
butterfly.say();

