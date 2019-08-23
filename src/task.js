import ID from './utils/ID.js';

export default class Task {
  constructor(config) {
    this.id = ID();
    this.updateProps(config);
    this.element = config.createTaskComponent(this.props);
  }

  updateProps(props) {
    this.props = Object.assign({}, props, { id: this.id });
  }

  set(component, props) {
    this.updateProps(props);
    this.element = component(this.props);
  }

  get() {
    return this.element;
  }

  getId() {
    return this.id;
  }
}