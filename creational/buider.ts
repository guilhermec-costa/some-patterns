// complex implementation
// builder interface 
interface Builder {
  setBrand(brand: string): Builder;
  setModel(model: string): Builder;
  setEngine(engine: string): Builder;
  build(): Car;
}

class CarBuilder implements Builder {
  public brand: string = "";
  public model: string = "";
  public engine: string = "";
  
  setBrand(brand: string): Builder {
    this.brand = brand;
    return this;
  }

  setModel(model: string): Builder {
    this.model = model;
    return this;
  }

  setEngine(engine: string): Builder {
    this.engine = engine;
    return this;
  }
  build(): Car {
    return new Car(this);
  }

}

class Car {
  public brand: string = "";
  public model: string = "";
  public engine: string = "";

  constructor(builder: CarBuilder) {
    this.brand = builder.brand;
    this.model = builder.model;
    this.engine = builder.engine;
  }

  public static builder(): CarBuilder {
    return new CarBuilder();
  }
}

// ---------------------------------------------------------------------------------

// simple implementation
// internal builder
class ComplexObject {
  private field1?: number;
  private field2?: number;
  private field3?: number;
  private field4?: number;

  static build() {
    return new ComplexObject();
  }

  addfield1(i: number) {
    this.field1 = i;
    return this;
  }
  addfield2(i: number) {
    this.field2 = i;
    return this;
  }
  addfield3(i: number) {
    this.field3 = i;
    return this;
  }

  addfield4(i: number) {
    this.field4 = i;
    return this;
  }
}

export function execute() {
  let obj1 = ComplexObject.build()
    .addfield1(5)
    .addfield2(10)
    .addfield3(15)
    .addfield4(20)

  let obj2 = ComplexObject.build()
    .addfield1(5)
    .addfield4(20)

  let obj3 = Car.builder()
    .setBrand("ford")
    .setEngine("1.5")
    .setModel("monza")
    .build();

  console.log({ obj1, obj2, obj3 });
}