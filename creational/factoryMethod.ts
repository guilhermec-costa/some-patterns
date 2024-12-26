abstract class ResourceCreator {

  abstract create(): Resource;
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
  create(): Resource {
    return new Resource1();
  }

}

class ResourceCreator2 extends ResourceCreator {
  create(): Resource {
    return new Resource2();
  }

}

class DerivedResourceCreator extends ResourceCreator2 {

  override create(): Resource {
    return new Resource1();
  }
}

export function execute() {

  let res1 = new ResourceCreator1().create();
  let res2 = new ResourceCreator2().create();
  let res3 = new DerivedResourceCreator().create();

  res1.consume();
  res2.consume();
  res3.consume();
}

/*

Use case:

1 - Use the Factory Method when you don’t know beforehand the exact types 
and dependencies of the objects your code should work with.
  The Factory Method separates product construction code from the code that actually uses the product. 
  Therefore it’s easier to extend the product construction code independently from the rest of the code.

2 - Use the Factory Method when you want to provide users of your library or framework with a way to extend its internal components.

3 - Use the Factory Method when you want to save system resources by reusing existing objects 
instead of rebuilding them each time.

*/
