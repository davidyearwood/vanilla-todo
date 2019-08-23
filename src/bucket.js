import ID from './utils/ID.js';
import { BucketComponent } from './views/bucket.js';
import taskComponentCreator from './views/task.js';
import getFormValues from './utils/getFormValues.js';
import removeChildrenNodes from './utils/removeChildrenNodes.js';
import spliceNode from './utils/spliceNode.js';

export default class Bucket {
  constructor(config) {
    this.id = ID();
    this.element = BucketComponent({
      title: config.title,
      id: this.id
    });
    this._taskCreateForm = taskComponentCreator.createForm({ id: ID() });
    this.element.appendChild(this._taskCreateForm);
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

    let updatedTask = component ? component(props) : task.element;

    tasks.set(props.id, {
      props,
      element: updatedTask
    });

    return tasks.get(props.id);
  }

  handleClick(e) {
    e.preventDefault();
    let { tasks, updateTask, renderTasks } = this;
    let { target } = e;
    let dataType = target.getAttribute('data-type');
    let id = target.getAttribute('data-id') || target.getAttribute('data-for');

    if (dataType === 'task') {
      this.updateTask(tasks.get(id).props, taskComponentCreator.editForm);
      this.renderTasks();
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

  renderTasks() {
    let { tasks, element } = this;
    let fragment = document.createDocumentFragment();

    console.log(tasks);
    for (let [key, value] of tasks) {
      fragment.appendChild(value.element);
    }

    console.log(fragment.children);

    removeChildrenNodes(element);
    element.appendChild(fragment);
  }
}
