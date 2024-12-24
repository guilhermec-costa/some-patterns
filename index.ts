import { Singleton } from "./creational/singleton";

let instance = Singleton.getInstance();
console.log(instance.state);