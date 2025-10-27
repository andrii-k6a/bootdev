// NOTE: run using `node --experimental-transform-types parameter-properties.ts`

// Without parameter properties
// class Hero {
//     name: string;
//     health: number;
//     private level: number;
//
//     constructor(name: string, health: number, level: number) {
//         this.name = name;
//         this.health = health;
//         this.level = level;
//     }
// }

// With parameter properties
class Hero {

    #secretPower: string;

    // By adding an access modifier (public, private, protected, or readonly) 
    // to a constructor parameter, TypeScript automatically:
    // - Declares a property with the same name and type
    // - Assigns the parameter value to that property
    //
    // Limitation:
    // Parameter properties work with TypeScript's private keyword,
    // but not with JavaScript's # private field syntax.
    // If you need truly private fields using the # syntax, you must declare them separately
    constructor(
        public alias: string,
        public health: number,
        private level: number,
        secretPower: string,
    ) {
        this.#secretPower = secretPower;
    }
}

const hero = new Hero("James", 100, 3, "flying");
console.log(hero);
console.log(`${hero.alias} is ${hero.health} units alive`);

