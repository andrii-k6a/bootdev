console.log("node --experimental-transform-types enum.ts");

//Note: enums get really hairy when you need to serialize them to JSON or store them in a database.
// They might be represented there as a number.

enum Direction {
    North, // 0
    East, // 1
    South, // 2
    West, // 3
}

let myDirection: Direction = Direction.North;
console.log(myDirection); // Outputs: 0

const directionValue: number = Direction.South;
console.log(directionValue); // 2

const directionName: string = Direction[directionValue];
console.log(directionName); // "South"

console.log(Direction[4]); // undefined

// re-decalaration leads to enum merging
enum Direction {
    // In an enum with multiple declarations, only one declaration can omit an initializer for its first enum element.
    Unknown = 4, // if enum value overlaps, it leads to ambihuius revers lookups
}

console.log(Direction[4]); // Unknown

// enum can have explicit values
enum StatusCode {
    OK = 200,
    Created = 201,
    BadRequest = 400,
    Unauthorized = 401,
    NotFound = 404,
}

// enum can have string values, but string enums do not support reverse mapping
enum LogLevel {
    ERROR = "101",
    WARN = "102",
    INFO = "103",
    DEBUG = "104",
}

console.log(LogLevel[0]); // undefined
console.log(LogLevel["WARN"]); // WARN
console.log(LogLevel["102"]); // undefined - reverse mapping not supported

enum State {
    POWER = compute(),
}
console.log(State.POWER); // 42

function compute() {
    return 42;
}

// const enums are completely removed during compilation and replaced with their literal values. Unlike regular enums, they don't ship extra mapping code
// Const enums are more performant, but do come with some limitations:
// - No computed values: They can reference other enum members, but can't use arbitrary expressions, like function calls
// - Mapping issues: Const enums don't have runtime representation, so getting the name from the number isn't possible
const enum Role {
    User = "User",
    Admin = "Admin",
}
console.log(Role.User);

