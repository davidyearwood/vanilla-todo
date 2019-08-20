import ID from './utils/ID.js';
import taskView from './views/taskView.js';

export default class Task {
  constructor(config) {
    this.id = ID();
    this.element = taskView({
      id: this.id,
      title: config.title,
      description: config.description
    });
  }

  get() {
    return this.element;
  }
}
