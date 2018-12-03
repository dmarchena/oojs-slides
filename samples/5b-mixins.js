var subjectMixin = {
  observers: [],
  registerObserver: function (observer) {
    this.observers.push(observer);
  },
  notifyAll: function () {
    var self = this;
    this.observers.forEach(function (observer) {
      observer.update(self);
    });
  }
}

var observerMixin = {
  update: function (subject) {
    throw new Error('update() must be overriden');
  }
}

var Person = {
  name: 'Alice',
  getName: function () {
    return this.name;
  },
  hello: function (another) {
    var anotherName = (another && another.getName)
      ? ' ' + another.getName()
      : '';
    console.log(`Hi${anotherName}! I'm ${this.getName()}`);
  }
}

var alice = Object.assign(Object.create(Person), subjectMixin, {
  setName: function (newName) {
    this.name = newName;
    this.notifyAll();
  }
});

var bob = Object.assign(Object.create(Person), observerMixin, {
  name: 'Bob',
  update: function (subject) {
    this.hello(subject);
  }
});

alice.registerObserver(bob);

alice.hello();
alice.setName('Alice Cooper');