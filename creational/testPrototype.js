class Person {
  talk() {
    console.log("talking")
  }
}

const me = new Person();
me.age = 20;

const you = new Person();
you.__proto__.talk();
Person.prototype.talk();

function NewPerson() {}
NewPerson.prototype.talk = function() {
  console.log("talking");
}

let he = new NewPerson();
he.talk();
