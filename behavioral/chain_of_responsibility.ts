// allow to pass a request along a chain of handlers
// each handler decides either to process the request or to pass it to the next handler

/*
    The code of the checks/steps, which had already looked like a mess, became more and more bloated as you added each new check feature. 
    Changing one check sometimes affected the others. Worst of all, when you tried to reuse the checks to protect other components of the system, 
    you had to duplicate some of the code since those components required some of the checks, but not all of them.
*/

/*
    The pattern suggests that you link these handlers into a chain. 
    Each linked handler has a field for storing a reference to the next handler in the chain. 
    In addition to processing a request, handlers pass the request further along the chain. 
    The request travels along the chain until all handlers have had a chance to process it.

    A handler can decide not to pass the request further down the chain and stop any further processing.
 */

/*
    1. Use the Chain of Responsibility pattern when your program is expected to process different kinds of requests in various ways, 
    but the exact types of requests and their sequences are unknown beforehand.
    2.  Use the pattern when it’s essential to execute several handlers in a particular order.
    3.  Use the CoR pattern when the set of handlers and their order are supposed to change at runtime.
 */

/*
 It’s crucial that all handler classes implement the same interface. Each concrete handler should only care about the following one having the execute method
 */

interface Handler {
    setNext(handler: Handler): Handler;
    handle(request: RequestStruct): void;
}

abstract class BaseHandler implements Handler {
    private nextHandler: Handler | null = null;

    public setNext(handler: Handler): Handler {
        this.nextHandler = handler;
        return handler;
    }

    public handle(request: RequestStruct): void {
        if (this.nextHandler) {
            this.nextHandler.handle(request);
        }
    }
}

class AuthHandler extends BaseHandler {
    public handle(request: RequestStruct): void {
        if (!request.isAuthenticated) {
            console.log("Not authenticated");
            return;
        }
        super.handle(request);
    }
}

class RoleHandler extends BaseHandler {
    public handle(request: RequestStruct): void {
        if (request.role !== "admin") {
            console.log("❌ Access denied: Insuficient privileges.");
            return;
        }
        super.handle(request);
    }
}

class LoggingHandler extends BaseHandler {
    public handle(request: RequestStruct): void {
        console.log(`📜 Logging user: ${request.user}`);
        super.handle(request);
    }
}

class EncryptHandler extends BaseHandler {
    public handle(request: RequestStruct): void {
        console.log("Encrypting data")
        request = {
            ...request,
            user: `${request.user}-${Math.random()}`
        }
        super.handle(request);
    }
}

type RequestStruct = {
    isAuthenticated: boolean;
    role: "admin" | "user";
    user: string;
};

export function execute() {
    const authHandler = new AuthHandler();
    const roleHandler = new RoleHandler();
    const loggingHandler = new LoggingHandler();
    const encryptHandler = new EncryptHandler();

    authHandler
        .setNext(roleHandler)
        .setNext(encryptHandler)
        .setNext(loggingHandler);

    const request1: RequestStruct = { isAuthenticated: false, role: "admin", user: "João" };
    authHandler.handle(request1);

    const request2: RequestStruct = { isAuthenticated: true, role: "user", user: "Maria" };
    authHandler.handle(request2);

    const request3: RequestStruct = { isAuthenticated: true, role: "admin", user: "Carlos" };
    authHandler.handle(request3);
}
