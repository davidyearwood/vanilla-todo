import ID from './utils/ID.js';
import taskView from './views/taskViewFactory.js';

export default class Task {
  constructor(config) {
    this.id = ID();
    this.element = taskView({
      id: this.id,
      title: config.title,
      description: config.description
    });
  }

  getForm() {
    return this.element.getForm();
  }

  get() {
    return this.element.get();
  }

  getId() {
    return this.id;
  }

  edit(props) {
    let newTask = taskView(
      Object.assign({}, props, {
        id: this.id
      })
    );

    this.element = newTask;

    return this.get;
  }
}
