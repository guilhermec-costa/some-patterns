// Adapter Pattern is used to integrate two or more interfaces that are incompatible between them
// so that they can work together

// E.g: data source with XML, and analytics library with JSON. 
// The main application collects XML data, e needs to convert it to JSON. A Adapter is necessary here
//
// The adapter needs an interface that is compatible with one of the objects (the client for example)
// and it wraps an instance of the server/library object. So, after converting the data from the client, it can be passed to the server/library in the correct format
//

type MercadoPagoUserAccount = {
    accountId: number;
    amount: number;
}

class MercadoPagoAPI {

    public currentUsers: MercadoPagoUserAccount[];

    constructor() {
        this.currentUsers = [
            { amount: 1000, accountId: 1 },
            { amount: 1000, accountId: 2 },
            { amount: 1000, accountId: 3 },
            { amount: 1000, accountId: 4 },
            { amount: 1000, accountId: 5 },
        ];
    }

    public makeTransaction(amount: number, accountId: number): void {
        const transactionOwner = this.currentUsers.find((u) => u.accountId == accountId)
        if (transactionOwner) {
            transactionOwner.amount += amount;
        }
    }
}

type StripeUserAccount = {
    accountId: number;
    amount: number;
}

class StripeAPI {
    public currentUsers: StripeUserAccount[];

    constructor() {
        this.currentUsers = [
            { amount: 1000, accountId: 1 },
            { amount: 1000, accountId: 2 },
            { amount: 1000, accountId: 3 },
            { amount: 1000, accountId: 4 },
            { amount: 1000, accountId: 5 },
        ];
    }

    public doTransaction(amount: number, accountId: number): void {
        const transactionOwner = this.currentUsers.find((u) => u.accountId == accountId)
        if (transactionOwner) {
            transactionOwner.amount += amount;
        }
    }
}

interface PaymentProvider {
    pay(amount: number, accountId: number): void;
}

class StripeAPIAdapter implements PaymentProvider {

    constructor(
        public readonly stripeAPIInstance: StripeAPI
    ) {}

    public pay(amount: number, accountId: number): void {
        this.stripeAPIInstance.doTransaction(amount, accountId);
    }
}

class MercadoPagoAPIAdapter implements PaymentProvider {

    constructor(
        public readonly mercadopagoAPIInstance: MercadoPagoAPI
    ) {}

    public pay(amount: number, accountId: number): void {
        this.mercadopagoAPIInstance.makeTransaction(amount, accountId);
    }


}

export function execute() {

    function makeTransaction(paymentProvider: PaymentProvider, amount: number, accountId: number) {
        paymentProvider.pay(amount, accountId);
    }

    const mercadopagoAdapter = new MercadoPagoAPIAdapter(new MercadoPagoAPI());
    const stripeAdapter = new StripeAPIAdapter(new StripeAPI());
    
    makeTransaction(mercadopagoAdapter, 1000, 1);
    makeTransaction(mercadopagoAdapter, -530, 2);
    makeTransaction(stripeAdapter, 1000, 1);

    console.log(mercadopagoAdapter.mercadopagoAPIInstance.currentUsers);
    console.log(stripeAdapter.stripeAPIInstance.currentUsers);
}
