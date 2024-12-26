abstract class ResourceCreator {

  abstract factoryMethod(): Resource;
}

interface Resource {
  consume(): void;
}

class Resource1 implements Resource {
  consume(): void {
    console.log("Resource 1 consumed");
  }
}

class Resource2 implements Resource {
  consume(): void {
    console.log("Resource 2 consumed");
  }

}

class ResourceCreator1 extends ResourceCreator {
  factoryMethod(): Resource {
    return new Resource1();
  }

}

class ResourceCreator2 extends ResourceCreator {
  factoryMethod(): Resource {
    return new Resource2();
  }

}

export function execute() {

  let res1 = new ResourceCreator1().factoryMethod();
  let res2 = new ResourceCreator2().factoryMethod();

  res1.consume();
  res2.consume();
}