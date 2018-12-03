// Class
class Person {
  constructor(name) {
    this.name = name || 'Alice';
  }
  hello() {
    console.log(`Hi! I'm ${this.name}.`);
  }
}

var alice = new Person('Alice');
var bob = new Person('Bob');
alice.hello();
bob.hello();
console.log(Person);

Person.prototype.hello = function () {
  console.log('Epa! ¡Que soy ' + this.name + '!');
};
alice.hello();
bob.hello(); 
