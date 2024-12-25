// simple factory
interface Vehicle {
  drive(): void;
}

class Car implements Vehicle {
  drive(): void {
    console.log("Driving a car");
  }
}

class Motorcycle implements Vehicle {
  drive(): void {
    console.log("Driving a motorcycle");
  }
}

class VehicleFactory {
  public static create(type: string): Vehicle {
    switch(type) {
      case "car": {
        return new Car();
      }

      case "motorcycle": {
        return new Motorcycle();
      }

      default:
        return new Car();
    }
  }
}


export function execute() {
  let car: Vehicle = VehicleFactory.create("car");
  let motorcycle: Vehicle = VehicleFactory.create("motorcycle");
  car.drive();
  motorcycle.drive();
}