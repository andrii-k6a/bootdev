class SecretAgent {

    // JavaScript's # private fields didn't come until ES2022,
    // but TS developers had wanted public/private/protected access modifiers for a long time,
    // so TypeScript added support for private and protected before then.
    // So a lot of older TypeScript code uses the keyword syntax.

    // private id: string; // old version
    #id: string; // a private field
    alias: string;

    constructor(id: string, alias: string) {
        this.#id = id;
        this.alias = alias; // requires explicit field declaration
    }

    getCodeName(): string {
        const idToCodeNameMap: Record<string, string> = {
            "007": "James Bond",
            "006": "Alec Trevelyan",
        };
        return idToCodeNameMap[this.#id] || "Unknown Agent";
    }
}

const bond = new SecretAgent("007", "Shadow");
console.log(bond.getCodeName()); // "James Bond"

// Property '#id' is not accessible outside class 'SecretAgent' because it has a private identifier.
// console.log(bond.#id);


// *** Abstract class ***
// NOTE: Like protected, the abstract keyword does not exist in native JavaScript. It's a TypeScript-only feature that helps enforce rules on subclasses at compile time. The abstract keyword and abstract-only methods are removed from the compiled code.

abstract class Shape {
    size: "small" | "medium" | "large";

    constructor(size: "small" | "medium" | "large") {
        this.size = size;
    }

    abstract calculateArea(): number;

    displayArea(): void {
        console.log(`The area of this shape is ${this.calculateArea()}`);
    }
}

// const shape = new Shape("small"); // Error: Cannot create an instance of an abstract class

class Circle extends Shape {
    radius: number;

    constructor(size: "small" | "medium" | "large") {
        super(size);
        if (this.size === "small") {
            this.radius = 5;
        } else if (this.size === "medium") {
            this.radius = 10;
        } else {
            this.radius = 15;
        }
    }

    calculateArea(): number {
        return Math.PI * this.radius * this.radius;
    }
}

const circle = new Circle("medium");
circle.displayArea(); // The area of this shape is 314.1592653589793

