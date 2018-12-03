# Trabajar con objetos en JavaScript

Los que trabajamos con JS sabemos que existen múltiples maneras de utilizar objetos. A veces las diferencias son sutiles y otras, aunque no tanto, las consecuencias no son apreciables a simple vista y hay que profundizar demasiado para valorar si la técnica es adecuada a nuestro caso.

El motivo de esta entrada es recopilar las técnicas que más me vienen a la cabeza y permitir seleccionar en cada momento la más adecuada.

## JavaScript está basado en prototipos

Cuando hablamos de programación orientada a objetos (POO) enseguida pensamos en clases y herencia. Pero éste es solo otro estilo de POO. JavaScript utiliza prototipos en vez de clases para tal propósito.

En la programación basada en clases los objetos son entidades cuya estructura y comportamiento están definidas por una clase. Por ello los objetos se crean como instancias de una clase. La herencia se define entre clases.

En la programación basada en prototipos los objetos heredan directamente de otros objetos a través de una propiedad: el prototipo. De hecho el prototipo es en si mismo un objeto, lo que permite modificarlo en ejecución, al contrario que las clases, cuya estructura es estática.

## Literal object, factoria, constructor, ES2015 class

```
var alice = {
    name: 'Alice',
    hello: function () {
        console.log('Hi! I\'m ' + this.name + '.');
    }
}
// Herencia simple (delegando en prototipo)
var bob = Object.create(alice);
bob.name = 'Bob';
var carol = Object.assign(Object.create(alice), { name: 'Carol' });
// Clonado
var dan = Object.assign({}, alice, { name: 'Dan' });
alice.hello();
bob.hello();
carol.hello();
dan.hello();

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

var personFactory = (function () {
    var proto = {
        name: 'Alice',
        hello: function () {
            console.log('Hi! I\'m ' + this.name + '.');
        }
    }
    return function(name) {
        return Object.assign(Object.create(proto), {
            name: name
        });
    }
})();
var alice = personFactory('Alice');
var bob = personFactory('Bob');
alice.hello();
bob.hello();

function Person(name) {
    this.name = namee || 'Alice';
}
Person.prototype.hello = function () {
    console.log('Hi! I\'m ' + this.name + '.');
}
var alice = new Person('Alice');
var bob = new Person('Bob');
alice.hello();
bob.hello();

class Person {
    constructor(name) {
        this.name = name || 'Alice';
    }
    hello() {
        console.log(`Hi! I'm ${this.name}.');
    }
}
var alice = new Person('Alice');
var bob = new Person('Bob');
alice.hello();
bob.hello();
```

## Module Pattern

```
var module = (function () {
	function privateFn() {
		console.log('privateFn');
    }
	return {
		publicFn: function publicFn(){
			console.log('publicFn called');
			privateFn();
        },
		publicFn2: function publicFn2(){
			console.log('publicFn2 called');
        }
    }
})();
```

### Revealing Module Pattern 
```
var revealingModule = (function () {
	function privateFn() {
		console.log('privateFn');
		publicFn2();
    }
	function publicFn(){
		console.log('publicFn');
		privateFn();
    }
	function publicFn2(){
		console.log('publicFn2');
    }
    
	return {
		publicFn: publicFn,
		publicFn2: publicFn2
	};
})();
```
Ventajas:

* Las funciones privadas pueden llamar a métodos públicos
* Es más fácil leer los métodos que son públicos

Desventajas:

* Si se sobrecarga una función pública, los métodos privados siguen llamando a la implementación inicial

```
revealingModule.publicFn();
Object.assign(revealingModule, {
    publicFn2: function publicFn2() {
		console.log('publicFn2 modificado');
    }
});
revealingModule.publicFn();
```

### Stacked locally scoped Object Literal
```
var locallyScopedModule = (function () {
	function privateFn() {
		console.log('privateFn');
		public.publicFn2();
    }
	var public = {
		publicFn: function publicFn(){
			console.log('publicFn');
			privateFn();
        },
		publicFn2: function publicFn2(){
			console.log('publicFn2');
        }
    }
	return public;
})();
```

Ventajas:

* Las funciones privadas pueden llamar a métodos públicos
* Si se sobrecarga una función pública, los métodos privados siguen llamaran a la nueva implementación

```
locallyScopedModule.publicFn();
Object.assign(locallyScopedModule, {
    publicFn2: function publicFn2() {
		console.log('publicFn2 modificado');
    }
});
locallyScopedModule.publicFn();
```

