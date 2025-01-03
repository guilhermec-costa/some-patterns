// family of related objects: button and checkbox
interface Button {
  setBorderRadius(radius: number): void;
  paint(): void;
}

interface CheckBox {
  check(): void;
}

// variant of button 
class SquareButton implements Button {
  setBorderRadius(radius: number): void {
  }
  paint(): void {
    console.log("square button paintted")
  }
}

// variant of button 
class RoundButton implements Button {
  setBorderRadius(radius: number): void {
  }
  paint(): void {
    console.log("round button paintted")
  }
}

// variant of checkbox
class SquareCheckBox implements CheckBox {
  check(): void {
    console.log("square check box checked")
  }
}

class RoundCheckBox implements CheckBox {
  check(): void {
    console.log("round check box checked")
  }
}

// related objects: button and checkbox
interface GUIFactory {
  createButton(): Button;
  createCheckBox(): CheckBox;
}

// create one concrete factory for each variant
class SquareComponentFactory implements GUIFactory {
  createButton(): Button {
    return new SquareButton();
  }
  createCheckBox(): CheckBox {
    return new SquareCheckBox();
  }
}

class RoundComponentFactory implements GUIFactory {
  createButton(): Button {
    return new RoundButton();
  }
  createCheckBox(): CheckBox {
    return new RoundCheckBox();
  }
}

export function execute() {
  const squareFactory = new SquareComponentFactory();
  const roundFactory = new RoundComponentFactory();

  const squareButton =  squareFactory.createButton();
  const squareCheckbox =  squareFactory.createCheckBox();

  const roundButton = roundFactory.createButton();
  const roundCheckbox = roundFactory.createCheckBox();

  squareButton.paint();
  squareCheckbox.check();
  roundButton.paint();
  roundCheckbox.check();
}

/*
Use case:

1 - Use the Abstract Factory when your code needs to work with various families of related products, 
but you don’t want it to depend on the concrete classes of those products—they might be unknown 
beforehand or you simply want to allow for future extensibility.

2 - Consider implementing the Abstract Factory when you have a class with a 
set of Factory Methods that blur its primary responsibility.

*/