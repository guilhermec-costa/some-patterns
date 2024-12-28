/*

Proxy is a structural design pattern that lets you provide a substitute or placeholder for another object. 
A proxy controls access to the original object, allowing you to perform something either before or after 
the request gets through to the original object.

But what’s the benefit? If you need to execute something either before or after 
the primary logic of the class, the proxy lets you do this without changing that class.

Helps classes on SRP

*/

// it is a disguise of the original service
interface ThirdPartyService {
  someOperation(): void;
  anotherOperation(): void;
}

class ConcreteThirdPartyService implements ThirdPartyService {
  someOperation(): void {
    console.log("doing some operation");
  }
  anotherOperation(): void {
    console.log("doing another operation");
  }
}

// the proxy implements the same interface the objet it will intercept implements
class InterceptorProxy implements ThirdPartyService {

  // reference to the original service
  constructor(
    private notTheProxy: ThirdPartyService) 
  {}

  // disguises to be the original object. A SUBSTITUTE
  someOperation(): void {
    console.log("Intercepting before operation")
    // delegating work to the original service
    this.notTheProxy.someOperation();
    console.log("Intercepting after operation");
  }

  anotherOperation(): void {}
}

class SomeManager {
  constructor(
    private disguiseService: ThirdPartyService
  ) {}

  highLevelOperation() {
    this.disguiseService.someOperation();
  }
}
export function execute() {

  const originalService = new ConcreteThirdPartyService();
  const serviceProxy = new InterceptorProxy(originalService);
  new SomeManager(serviceProxy).highLevelOperation();
}

/*

Use cases:

1 - Lazy initialization (virtual proxy). This is when you have a heavyweight service object that wastes system resources by being always up, 
even though you only need it from time to time.
  delay the object’s initialization to a time when it’s really needed.

2 - Access control (protection proxy). This is when you want only specific clients to be able to use the service object; 
for instance, when your objects are crucial parts of an operating system and clients are various launched applications (including malicious ones).
  The proxy can pass the request to the service object only if the client’s credentials match some criteria.

3 - Local execution of a remote service (remote proxy). This is when the service object is located on a remote server.
  In this case, the proxy passes the client request over the network, handling all of the nasty details of working with the network.

4 - Logging requests (logging proxy). This is when you want to keep a history of requests to the service object.
  The proxy can log each request before passing it to the service.

5 - Caching request results (caching proxy). This is when you need to cache results of client requests and 
manage the life cycle of this cache, especially if results are quite large.
  The proxy can implement caching for recurring requests that always yield the same results. 
  The proxy may use the parameters of requests as the cache keys.

6 - Smart reference. This is when you need to be able to dismiss a heavyweight object once there are no clients that use it.

*/