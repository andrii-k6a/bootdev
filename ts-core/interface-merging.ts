interface Person {
    name: string;
}

interface Person {
    age: number;
}

interface Person {
    greeting(): void;
}

// interface re-declaration merges it (might be useful for extending global objects, like window)
// all the proprs are required
const p: Person = {
    name: "Lil Kook",
    age: 14,
    greeting: () => console.log("Yo!"),
};

type Pet = {
    name: string;
}

// ERROR if type has already been declared
// type Pet = {
//     age:  number;
// }

// Microsoft says extending interfaces is better than intersections because
interface SuperHuman extends Person {
    power: string;
}

// MSFT's wiki: https://github.com/microsoft/TypeScript/wiki/Performance#preferring-interfaces-over-intersections

// Interfaces create a single flat object type that detects property conflicts, which are 
// usually important to resolve! Intersections on the other hand just recursively merge properties,
// and in some cases produce never. 
// Interfaces also display consistently better, whereas type aliases to intersections can't 
// be displayed in part of other intersections. 
// Type relationships between interfaces are also cached, as opposed to intersection types as a whole.
// A final noteworthy difference is that when checking against a target intersection type, every constituent is checked before checking against the "effective"/"flattened" type.

// For this reason, extending types with interfaces/extends is suggested over creating intersection types.
