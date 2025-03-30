// Command pattern turns requests into defined objects.
// so, a client (sender) sends a request to a generic server (receiver) using a command object,
// not the arguments of the request directly
// so the command object serves as a link between the sender and the receiver
//
// this way, the sender does not need to know which receiver will receive the request. It only calls the command and it knows how to execute
//
// Use the Command pattern when you want to parametrize objects with operations.
// Use the Command pattern when you want to queue operations, schedule their execution, or execute them remotely.
// Use the Command pattern when you want to implement reversible operations.



interface OrderCommand {
    run(): void;
}

class OrderService {
    createOrder(orderId: string) {
        console.log(`📦 Pedido ${orderId} criado.`);
    }

    cancelOrder(orderId: string) {
        console.log(`❌ Pedido ${orderId} cancelado.`);
    }

    payOrder(orderId: string) {
        console.log(`💳 Pedido ${orderId} pago.`);
    }
}

class CreateOrderCommand implements OrderCommand {
    constructor(private orderService: OrderService, private orderId: string) { }
    public run() {
        this.orderService.createOrder(this.orderId);
    }
}

class PayOrderCommand implements OrderCommand {
    constructor(private orderService: OrderService, private orderId: string) { }
    public run(): void {
        this.orderService.payOrder(this.orderId);
    }
}

class CancelOrderCommand implements OrderCommand {
    constructor(private orderService: OrderService, private orderId: string) { }
    public run(): void {
        this.orderService.cancelOrder(this.orderId);
    }
}

class CommandInvoker {
    public invoke(command: OrderCommand) {
        command.run();
    }
}

type OrderData = {
    id: string;
    product: string;
    price: number;
}

export function execute() {
    const orderService = new OrderService();
    const invoker = new CommandInvoker();

    const orderData: OrderData = { id: "123", product: "Laptop", price: 2500 };

    const createOrder = new CreateOrderCommand(orderService, orderData.id);
    const payOrder = new PayOrderCommand(orderService, "123");
    const cancelOrder = new CancelOrderCommand(orderService, "123");

    invoker.invoke(createOrder);
    invoker.invoke(payOrder);
    invoker.invoke(cancelOrder);
}
