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

    if (found !== undefined) {
      return tasks;
    }

    element.appendChild(task.get());
    this.tasks.push(task);

    return tasks;
  }

  handleClick(e) {
    console.log(this.element);
  }
}
