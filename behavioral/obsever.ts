/*

lets you define a subscription mechanism to notify multiple objects about any events 
that happen to the object they’re observing.

The object that has some interesting state is often called subject, 
but since it’s also going to notify other objects about the changes to its state, we’ll call it publisher. 

All other objects that want to track changes to the publisher’s state are called subscribers/listener

*/

interface Subject {
    subscribe(observer: Observer): void;
    unsubscribe(observer: Observer): void;
    notify(): void;
}

// this represents ONE TOPIC, so, every subscriber here, subscribes to this topic/subject/publisher
class ConcreteSubject implements Subject {

    private observers: Observer[] = [];
    private state: boolean = true;

    subscribe(observer: Observer): void {
        this.observers.push(observer);
    }

    unsubscribe(observer: Observer): void {
        const observerIdx = this.observers.indexOf(observer);
        this.observers.splice(observerIdx, 1);
    }

    notify(): void {
        for (const observer of this.observers) {
            observer.update(this.state);
        }
    }

    public operate() {
        this.state = !this.state;
        this.notify();
    }

}

interface Observer {
    update(state: boolean): void;
}

class ConcreteObserver1 implements Observer {
    update(state: boolean): void {
        console.log("Concrete observer 1 reacting to concret subjects events - state " + state);
    }
}

class ConcreteObserver2 implements Observer {
    update(state: boolean): void {
        console.log("Concrete observer 2 reacting to concrete subject events - state " + state);
    }
}


type ProductPurchaseMetadata = {
    name: string;
    price: number;
}

interface ProductPurchasedObserver {
    update(info: ProductPurchaseMetadata): void;
}

interface ProductPurchasedSubject {
    subscribe(observer: ProductPurchasedObserver): void;
    unsubscribe(observer: ProductPurchasedObserver): void;
    notify(productInfo: ProductPurchaseMetadata): void;
}

class ProductStockObserver implements ProductPurchasedObserver {

    public availableProducts: number;
    constructor() {
        this.availableProducts = 10;
    }

    update(info: ProductPurchaseMetadata): void {
        this.availableProducts--;
    }
}

class ProductPurchasedSubject implements ProductPurchasedSubject {

    public subscribers!: ProductPurchasedObserver[];

    constructor() {
        this.subscribers = [];
    }

    subscribe(observer: ProductPurchasedObserver): void {
        this.subscribers.push(observer);
    }

    unsubscribe(observer: ProductPurchasedObserver): void {
        const observerIdx = this.subscribers.indexOf(observer);
        if (observerIdx > -1) {
            this.subscribers.splice(observerIdx, 1);
        }
    }

    notify(productInfo: ProductPurchaseMetadata): void {
        for (const obs of this.subscribers) {
            obs.update(productInfo)
        }
    }

    public purchase(productInfo: ProductPurchaseMetadata) {
        this.notify(productInfo);
    }
}

export function execute() {
    let sub1 = new ConcreteSubject();

    const obs1 = new ConcreteObserver1();
    sub1.subscribe(obs1);

    const obs2 = new ConcreteObserver2();
    sub1.subscribe(obs2);

    sub1.operate();
    sub1.operate();

    const productPurchasedSubject = new ProductPurchasedSubject();
    const productStockObserver = new ProductStockObserver();
    productPurchasedSubject.subscribe(productStockObserver);

    productPurchasedSubject.purchase({
        name: "Product 1",
        price: 20
    });
    
    console.log(productPurchasedSubject.subscribers);
    productPurchasedSubject.unsubscribe(productStockObserver)
    console.log(productStockObserver.availableProducts)
    console.log(productPurchasedSubject.subscribers);
}
