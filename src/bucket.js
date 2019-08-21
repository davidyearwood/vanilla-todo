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

  taskToForm(id) {
    let task = this.tasks.get(id);
    let taskUI = task.get();
    let taskForm = task.getForm();
    let parent = this.element.get();

    parent.replaceChild(taskForm, taskUI);
  }

  handleClick(e) {
    e.preventDefault();
    let { target } = e;
    let dataType = target.getAttribute('data-type');
    let id = target.getAttribute('data-id') || target.getAttribute('data-for');
    if (dataType === 'task') {
      this.taskToForm(id);
    } else if (dataType === 'form') {
      let dataAction = target.getAttribute('data-action');
      if (dataAction === 'update') {
        this.updateTask(id);
      } else if (dataAction === 'cancel') {
        this.close(id);
      } else if (dataAction === 'delete') {
        this.removeTask(id);
      }
    }
  }

  updateTask(id) {
    let props = {};
    let task = this.tasks.get(id);
    let { element } = task;

    Array.prototype.forEach.call(element.getForm(), child => {
      let { name, value } = child;

      if (name) {
        props[name] = value;
      }
    });

    task.edit(props);
    this.close(id);
  }

  removeTask(id) {
    let task = this.tasks.get(id);

    if (!task) {
      return true;
    }

    let deletedNode = this.element.get().removeChild(task.getForm());
    task.delete(id);
  }

  close(id) {
    let task = this.tasks.get(id);
    let taskUI = task.get();
    let parent = this.element.get();
    let taskForm = parent.querySelector(`#task-form-${id}`);

    parent.replaceChild(taskUI, taskForm);
  }

  taskToForm(id) {
    let task = this.tasks.get(id);
    let taskForm = task.getForm();
    let parent = this.element.get();
    let taskUI = parent.querySelector(`#task-${id}`);

    parent.replaceChild(taskForm, taskUI);
  }
}
