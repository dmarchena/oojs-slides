function personSimpleFactory(name) {
  return {
    name: name || 'Alice',
    hello: function () {
      console.log('Hi! I\'m ' + this.name + '.');
    }
  }
}
var alice = personSimpleFactory('Alice');
var bob = personSimpleFactory('Bob');
alice.hello();
bob.hello();

alice.__proto__.hello = function () {
  console.log('Epa! ¡Que soy ' + this.name + '!');
}

alice.hello();
bob.hello();