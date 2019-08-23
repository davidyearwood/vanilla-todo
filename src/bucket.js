import ID from './utils/ID.js';
import { BucketComponent } from './views/bucket.js';
import taskComponentCreator from './views/task.js';
import getFormValues from './utils/getFormValues.js';

export default class Bucket {
  constructor(config) {
    this.id = ID();
    this.element = BucketComponent({
      title: config.title,
      id: this.id
    });
    this.element.appendChild(taskComponentCreator.createForm({ id: ID() }));
    this.tasks = new Map();
    this.element.addEventListener('click', this.handleClick.bind(this));
  }

  addTaskToDom(props) {
    let task = this.addTask(props);

    this.element.appendChild(task.element);
  }

  addTask(props) {
    let { tasks } = this;
    let id = ID();
    let task = taskComponentCreator.content(Object.assign(props, { id }));
    tasks.set(id, {
      props: Object.assign(props, { id }),
      element: task
    });

    return tasks.get(id);
  }

  removeTask(id) {
    let task = this.tasks.get(id);
    let isDeleted = this.tasks.delete(id);

    return task;
  }

  updateTask(props, component) {
    let { tasks, element } = this;
    let task = tasks.get(props.id);

    if (!task) {
      return null;
    }

    let updatedTask = component(props);

    tasks.set(props.id, {
      props,
      element: updatedTask
    });

    return tasks.get(props.id);
  }

  handleClick(e) {
    e.preventDefault();
    let { target } = e;
    let dataType = target.getAttribute('data-type');
    let id = target.getAttribute('data-id') || target.getAttribute('data-for');

    if (dataType === 'task') {
      let task = this.tasks.get(id);
      let newTask = this.updateTask(task.props, taskComponentCreator.editForm);
      this.element.replaceChild(newTask.element, task.element);
    } else if (dataType === 'form') {
      let dataAction = target.getAttribute('data-action');
      if (dataAction === 'update') {
        let task = this.tasks.get(id);
        let updatedProps = Object.assign({}, getFormValues(target.parentNode), {
          id
        });
        let newTask = this.updateTask(
          updatedProps,
          taskComponentCreator.content
        );
        this.element.replaceChild(newTask.element, task.element);
      } else if (dataAction === 'cancel') {
        let task = this.tasks.get(id);
        let newTask = this.updateTask(task.props, taskComponentCreator.content);
        this.element.replaceChild(newTask.element, task.element);
      } else if (dataAction === 'delete') {
        let removedTask = this.removeTask(id);
        this.element.removeChild(removedTask.element);
      } else if (dataAction === 'create') {
        let formValues = getFormValues(target.parentNode);
        let newId = ID();
        this.addTaskToDom(Object.assign(formValues, { id: newId }));
      }
    }
  }
}
