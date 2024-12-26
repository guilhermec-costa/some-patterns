// for prototype support
interface Prototype<T> {
  clone(obj: any): T;
}

class ConcretePrototype implements Prototype<ConcretePrototype> {

  public field1: string;

  constructor(field: string) {
    this.field1 = field;
  }

  public clone() {
    return new ConcretePrototype(this.field1);
  }
}

class ConcretePrototype2 extends ConcretePrototype implements Prototype<ConcretePrototype2> {

  private field2: string;

  constructor(field1: string, field2: string) {
    super(field1);
    this.field2 = field2;
  }

  public clone() {
    return new ConcretePrototype2(this.field1, this.field2);
  }
}


export function execute() {
  const original = new ConcretePrototype("Config 1");
  const copy = original.clone();

  const original2 = new ConcretePrototype2("Config 1", "Config 2");
  const copy2 = original2.clone();
  console.log(copy2);

}

/*
Criação eficiente: 
Ao clonar um objeto existente, você evita recriar do zero, economizando recursos e tempo. 
Isso é muito útil em sistemas onde a criação de instâncias é complexa ou requer inicializações demoradas.

Redução de acoplamento: Com o Prototype, a lógica de criação de objetos fica encapsulada no protótipo original. 
Assim, se precisar mudar como um objeto é configurado ou inicializado, basta alterar o protótipo base. 
Todas as instâncias clonadas refletirão essa mudança automaticamente, 
eliminando a necessidade de atualizar múltiplos pontos no código.
*/