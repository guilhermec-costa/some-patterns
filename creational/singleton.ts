class Singleton {

  private static instance: Singleton;
  public state: string;

  private constructor() {
    this.state = "not good";
  }

  public static getInstance() {
    if (Singleton.instance == null) {
      Singleton.instance = new Singleton()
    }

    return Singleton.instance;
  }

  public setState(someState: string) {
    this.state = someState;
  }
}

export function execute() {

  let instance1 = Singleton.getInstance();
  console.log(instance1.state);
  // output: "not good"

  instance1.setState("state from instance 1");

  let instance2 = Singleton.getInstance();
  console.log(instance2.state);
  // output: "state from instance 1"
}
/*
Use cases:

1 - Use the Singleton pattern when a class in your program 
should have just a single instance available to all clients; 
for example, a single database object shared by different parts of the program.
  The Singleton pattern disables all other means of creating objects of a class except for the special creation method. 
  This method either creates a new object or returns an existing one if it has already been created.

2 - Use the Singleton pattern when you need stricter control over global variables.
Unlike global variables, the Singleton pattern guarantees that there’s just one instance of a class. 
Nothing, except for the Singleton class itself, can replace the cached instance.

Note that you can always adjust this limitation and allow creating any number of Singleton instances. 
The only piece of code that needs changing is the body of the getInstance method.
*/