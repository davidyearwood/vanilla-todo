import ID from './utils/ID.js';
import bucketView from './views/bucketFactoryView.js';

export default class Bucket {
  constructor(config) {
    this.id = ID();
    this.element = bucketView({
      title: config.title,
      id: this.id
    });

    this.tasks = new Map();
    this.element.get().addEventListener('click', this.handleClick.bind(this));
  }

  addTask(task) {
    let { tasks } = this;
    if (tasks.has(task.id)) {
      return this.tasks;
    }

    this.element.get().appendChild(task.get());

    tasks.set(task.id, task);

    return tasks;
  }

  removeTask(id) {
    let task = tasks.get(id);
    let isDeleted = tasks.delete(id);

    if (isDeleted) {
      this.element.removeChild(task.get());
    }

    return isDeleted;
  }

  taskToForm(id) {}

  handleClick(e) {
    console.log(this);
    console.log(e.target);
  }
}
