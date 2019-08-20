import ID from './utils/ID.js';
import bucketView from './views/bucketView.js';

export default class Bucket {
  constructor(config) {
    this.id = ID();
    this.element = bucketView({
      title: config.title,
      id: this.id
    });
    this.tasks = [];
    this.element.addEventListener('click', this.handleClick.bind(this));
  }

  addTask(task) {
    let { tasks, element } = this;
    let found = tasks.find(t => t.id === task.id);
    console.log(this.tasks);
    if (found !== undefined) {
      return this.tasks;
    }

    element.appendChild(task.get());
    tasks.push(task);

    return tasks;
  }

  createTask() {}

  removeTask(id) {
    let found = this.tasks.find(task => task.id === id);

    if (found === undefined) {
      return null;
    }

    this.element.removeChild(found.element);
    this.tasks = this.tasks.filter(task => task.id !== id);

    return found;
  }

  handleClick(e) {
    console.log(this.element);
  }
}
