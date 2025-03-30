import { execute as execSingleton } from "./creational/singleton";
import { execute as execPrototype } from "./creational/prototype";
import { execute as execBuilder } from "./creational/buider";
import { execute as execSimpleFactory } from "./creational/simpleFactory";
import { execute as execFactoryMethod } from "./creational/factoryMethod";
import { execute as execAbstractFactory } from "./creational/abstractFactory";
import { execute as execFacade } from "./structural/facade";
import { execute as execProxy } from "./structural/proxy";
import { execute as execDecorator } from "./structural/decorator";
import { execute as execObserver } from "./behavioral/obsever";
import { execute as executeStrategy } from "./behavioral/strategy";
import { execute as executeAdapter } from "./structural/adapter";
import { execute as executeCommand } from "./behavioral/command";
import { executeHooks } from "./hook_pattern";
import { execute as executeChainOfResponsibility } from "./behavioral/chain_of_responsibility";
import { execute as executeMediator } from "./behavioral/mediator"

/*
  Design patterns:
    - typical solutions to commonly occurring problems in software design
    - a general concept for solving a particular problem
    - while an algorithm always defines a clear set of actions that can achieve some goal, 
      a pattern is a more high-level description of a solution
    - algorithms are more like recipes to follow step by step,
       while design patterns are more like customizable blueprint you decide the order of implementation

    - Design patterns define a common language that you and your teammates can use to communicate more efficiently

    Types of design patterns:
      - Creational patterns provide object creation mechanisms that increase flexibility and reuse of existing code.
      - Structural patterns explain how to assemble objects and classes into larger structures, 
        while keeping these structures flexible and efficient.
      - Behavioral patterns take care of effective communication and the assignment of responsibilities between objects.

*/

//execSingleton();
//execPrototype();
//execBuilder();
//execSimpleFactory();
//execFactoryMethod();
//execAbstractFactory();
//execFacade();
//execProxy();
//execDecorator();
//execObserver();
// executeStrategy();
// executeAdapter();
// executeCommand();
// executeHooks();
// executeChainOfResponsibility();
executeMediator();
