interface Vehicle {
    make: string;
    model: string;
}

interface Drivable {
    drive(distance: number): void;

    // TS interface cannot method implementations, just signatures
    //
    // emergency() {
    //     console.log("Calling 911...");
    // }
    //
    // emergency = () => {
    //     console.log("Calling 911...");
    // }
}

class ElectricCar implements Vehicle, Drivable {
    make: string;
    model: string;


    // not required by the interfaces, but it's
    // okay to add extra properties
    private isRunning: boolean = false;

    constructor(make: string, model: string) {
        this.make = make;
        this.model = model;
        this.isRunning = false;
    }

    drive(distance: number): void {
        this.isRunning = true;
        console.log(`Driving ${distance} miles: ${this.isRunning}`);
    }

}

const myCar = new ElectricCar("Rivian", "R1");

function testDrive(vehicle: Vehicle) {
    console.log(`Testing ${vehicle.make} ${vehicle.model}`);
}

testDrive(myCar);

function takeForARide(drivable: Drivable) {
    drivable.drive(10);
}

takeForARide(myCar); // "Driving 10 miles"

