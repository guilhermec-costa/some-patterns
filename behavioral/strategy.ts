/*

Strategy is a behavioral design pattern that lets you define a family of algorithms, 
put each of them into a separate class, and make their objects interchangeable

Strategy defines different approaches that can be used to reach the same goal, with the same object,
interchangebly, via a common strategy interface

routing system analogy:
Each time you added a new routing algorithm, 
the main class of the navigator doubled in size. At some point, the beast became too hard to maintain.

The Strategy pattern suggests that you take a class that does something specific 
in a lot of different ways and extract all of these algorithms into separate classes called strategies.

*/


/*
  generic interface, which only exposes a single method for triggering 
  the algorithm encapsulated within the selected strategy.
*/
interface Strategy {
  executeAlgorithm(): void;
}

// Concrete Strategies implement different variations of an algorithm the context uses.
class ConcreteStrategyA implements Strategy {
  executeAlgorithm(): void {
      console.log("executing strategy A");
  }
}

// Concrete Strategies implement different variations of an algorithm the context uses.
class ConcreteStrategyB implements Strategy {
  executeAlgorithm(): void {
      console.log("executing strategy B");
  }
}

/*

The context isn’t responsible for selecting an appropriate algorithm for the job. 
Instead, the client passes the desired strategy to the context

*/
class ExecutionContextWithStrategy {

  constructor( private strategy: Strategy) {}

  public executeStrategy() {
    this.strategy.executeAlgorithm();
  }

  setStrategy(strategy: Strategy): void {
    this.strategy = strategy;
  }

}

// without strategy
class ExecutionContextWithoutStrategy {

  executeAlgorithmA(): void {
      console.log("executing strategy A");
  }

  executeAlgorithmB(): void {
      console.log("executing strategy B");
  }
}


export function execute() {
  const noStrategy = new ExecutionContextWithoutStrategy();
  noStrategy.executeAlgorithmA();
  noStrategy.executeAlgorithmB();
  console.log("----------------------")

  const strategyA = new ConcreteStrategyA();
  const execCtx = new ExecutionContextWithStrategy(strategyA);
  execCtx.executeStrategy();

  const strategyB = new ConcreteStrategyB();
  execCtx.setStrategy(strategyB);
  execCtx.executeStrategy();
}