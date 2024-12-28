import { execute as execSingleton } from "./creational/singleton";
import { execute as execPrototype } from "./creational/prototype";
import { execute as execBuilder } from "./creational/buider";
import { execute as execSimpleFactory } from "./creational/simpleFactory";
import { execute as execFactoryMethod } from "./creational/factoryMethod";
import { execute as execAbstractFactory } from "./creational/abstractFactory";
import { execute as execFacade } from "./structural/facade";
import { execute as execProxy } from "./structural/proxy";
import { execute as execDecorator } from "./structural/decorator";

//execSingleton();
//execPrototype();
//execBuilder();
//execSimpleFactory();
//execFactoryMethod();
//execAbstractFactory();
//execFacade();
//execProxy();
execDecorator();