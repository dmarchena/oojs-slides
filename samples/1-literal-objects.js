// Literal

var alice = {
  name: 'Alice',
  hello: function () {
    console.log('Hi! I\'m ' + this.name + '.');
  }
}

alice.hello();