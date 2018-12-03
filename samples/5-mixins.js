var Persona = {
  name: 'Alice',
  getName: function () {
    return this.name;
  },
  hello: function () {
    console.log('Hi! I\'m ' + this.getName() + '.');
  }
}

var mixinPersonaConApellido = {
  surname: 'Cooper',
  getName: function () {
    return this.name ? `${this.name} ${this.surname}` : this.surname;
  }
}

var alice = Object.assign({}, Persona, mixinPersonaConApellido);
alice.hello();