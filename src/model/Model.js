export default class Model {
  constructor() {
    this.observers = [];
  }

  register(observer) {
    this.observers.push(observer);
  }

  unregister(observer) {
    this.observers = this.observers.filter(o => observer !== o);
  }

  notify(data) {
    this.observers.forEach((observer) => {
      observer.update(data);
    });
  }
}
