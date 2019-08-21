import ID from './utils/ID.js';
import taskView from './views/taskViewFactory.js';

export default class Task {
  constructor(config) {
    this.id = ID();
    this.props = Object.assign({}, config, { id: this.id });
    this.element = taskView(this.props);
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
    this.props = Object.assign(this.props, props, { id: this.id });
    let newTask = taskView(this.props);

    this.element = newTask;

    return this.get;
  }
}
