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
