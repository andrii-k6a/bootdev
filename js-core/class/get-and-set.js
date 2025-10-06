class Car {
    constructor(type, engine, description) {
        this._type = type; // to avoid a name collision, props with getter/setter conventionally start with _ prefix
        this._engine = engine;
        this.descProp = description;
    }

    get type() {
        return this._type.toUpperCase();
    }

    get engine() {
        if (this._engine === "B58") {
            return "secret";
        } else {
            return this._engine;
        }
    }

    get desc() {
        return this.descProp;
    }

    get flying() {
        console.log("car cannot fly yet");
        return false;
    }

    set type(type) {
        if (type && type !== "unknown") {
            this._type = type;
        }
    }

    set standart(std) {
        this._std = std;
    }
}

const car = new Car("basic", "B58", "street beast");
console.log(car);
console.log(car.type);
console.log(car.engine);
console.log(car.desc);
console.log(car.flying);

car.type = "stage 2";
car.standart = "xyz";
console.log(car);

