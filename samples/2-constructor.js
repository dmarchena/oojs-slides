// Constructor
function Person(name) {
  this.name = name || 'Alice';
}

// Prototipo del constructor
Person.prototype.hello = function () {
  console.log('Hi! I\'m ' + this.name + '.');
}

var alice = new Person('Alice');
var bob = new Person('Bob');
alice.hello();
bob.hello();

// var proto = Person.prototype;
// var proto = Object.getPrototypeOf(alice);
// var proto = alice.__proto__;

Person.prototype.hello = function () {
  console.log('Epa! ¡Que soy ' + this.name + '!');
};

alice.hello();
bob.hello();
// 