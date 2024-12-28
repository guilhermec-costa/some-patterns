/*

Decorator is a structural design pattern that lets you attach new behaviors to objects by placing these 
objects inside special wrapper objects that contain the behaviors.

Decorator is a pattern that can be defined by WRAPPERS.
In this context, a wrapper is a container that involves a target, 
complementing its behavior with new funcionalities

The wrapper contains the same set of methods as the target and delegates to it all requests it receives. 
However, the wrapper may alter the result by doing something either 
before or after it passes the request to the target.

extends behavior, but aren't part of the object

*/

// for wrappers and wrapped objects
interface Component {
  name: string; 
  act(a: string): void;
}

// basic behavior. The object that will be wrapped inside decorators
class BasicConcreteComponent implements Component {

  name = "default-name";

  act(s: string): void {
    console.log("final name: " + this.name);
  }
}

class BaseDecorator implements Component {

  name = "base-decorator"
  // The object that will be wrapped inside decorators
  constructor(
    protected wrappedComponent: Component
  ) {}

  act(a: string): void {
    this.wrappedComponent.name += this.name;
    this.wrappedComponent.act(a);
  }
}

class DerivedDecorator extends BaseDecorator {

  override act(a: string): void {
    this.wrappedComponent.name += "derive-decorator";
    super.act(a);
  }
}

// FLOW: ... -> DerivedDecorator -> BaseDecorator

export function execute() {
  // the base decorator is not called
  let a = new BasicConcreteComponent();
  let b = new DerivedDecorator(a);
  b.act("some text");

  // it is a chain of actions e operations
}

/*
Use cases

1 -  Use the Decorator pattern when you need to be able to assign extra behaviors 
to objects at runtime without breaking the code that uses these objects.

2 - Use the pattern when it’s awkward or not possible to extend an object’s behavior using inheritance.
*/
