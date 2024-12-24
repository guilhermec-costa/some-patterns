export class Singleton {

  private static instance: Singleton;
  public state: string;

  private constructor() {
    this.state = "not good";
  }

  public static getInstance() {
    if(Singleton.instance == null) {
      Singleton.instance = new Singleton()
    }

    return Singleton.instance;
  }

  public setState(someState: string) {
    this.state = someState;
  }
}
