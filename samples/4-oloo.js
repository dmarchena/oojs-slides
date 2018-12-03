// OLOO: Object Linked to Other Objects
var alice = {
  name: 'Alice',
  hello: function () {
    console.log('Hi! I\'m ' + this.name + '.');
  }
}

// Herencia simple (delegando en prototipo)
var bob = Object.create(alice);
bob.name = 'Bob';

var carol = Object.create(alice, { 
  name: {
    value: 'Carol',
    writable: true 
  }
});

var dan = Object.assign(Object.create(alice), {
  name: 'Dan' 
});

// CLON
var eva = Object.assign({}, alice, { name: 'Eva' });

alice.hello();
bob.hello();
carol.hello();
dan.hello();
eva.hello();

// alice.hello = function() {
//   console.log('Epa! ¡Que soy ' + this.name + '!');
// }
// alice.hello();
// bob.hello();
// carol.hello();
// dan.hello();
// eva.hello();

// console.log(dan.__proto__ === alice);
// console.log(Object.getPrototypeOf(dan) === alice);
// console.log(eva.__proto__ === alice);