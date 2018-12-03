/* Metodo factoria mediante 
 * IIFEs(Immediately - invoked function expressions) */
var personFactory = (function () {
  var proto = {
    name: 'Alice',
    hello: function () {
      console.log('Hi! I\'m ' + this.name + '.');
    }
  }
  return function (name) {
    var person = Object.create(proto);
    person.name = name;
    return person;
  }
})();

var alice = personFactory('Alice');
var bob = personFactory('Bob');
alice.hello();
bob.hello();

Object.getPrototypeOf(alice).hello = function () {
  console.log('Epa! ¡Que soy ' + this.name + '!');
}
alice.hello();
bob.hello();