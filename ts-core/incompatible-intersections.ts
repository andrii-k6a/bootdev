type Car = {
    made: "daewoo" | "ferrari";
    maxSpeed: number;
}

type Phone = {
    made: "samsung" | "apple";
    battery: number;
}

// The intersection 'Labubu' was reduced to 'never' because property 'made' has conflicting types in some constituents.
type Labubu = Car & Phone;

// Type '{}' is not assignable to type 'never'
// const labubu: Labubu = {};

type Device = {
    id: number;
    description: string;
}

type Software = {
    id: string;
    os: string;
}

// same - id is `never`
type SoftDevice = Software & Device;

