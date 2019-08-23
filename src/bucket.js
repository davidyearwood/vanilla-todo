import ID from './utils/ID.js';
import { BucketComponent } from './views/bucket.js';
import taskComponentCreator from './views/task.js';
import getFormValues from './utils/getFormValues.js';
import clearFormValues from './utils/clearFormValues.js';
import removeChildrenNodes from './utils/removeChildrenNodes.js';
import spliceNode from './utils/spliceNode.js';
import createElement from './utils/createElement.js';

export default class Bucket {
  constructor(config) {
    this.id = ID();
    this.element = BucketComponent({
      title: config.title,
      id: this.id
    });

    this._taskCreateForm = taskComponentCreator.createForm({ id: ID() });
    this._taskContainer = createElement('section', { class: 'tasks-list'});

    this.element.appendChild(this._taskCreateForm);
    this.element.appendChild(this._taskContainer);


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
        this.updateTask(
          updatedProps,
          taskComponentCreator.content
        );
        this.renderTasks();
      } else if (dataAction === 'cancel') {
        let task = this.tasks.get(id);
        this.updateTask(task.props, taskComponentCreator.content);
        this.renderTasks();
      } else if (dataAction === 'delete') {
        this.removeTask(id);
        this.renderTasks();
      } else if (dataAction === 'create') {
        this.addTask(Object.assign(getFormValues(target.parentNode), { id: ID() } ));
        clearFormValues(target.parentNode);
        this.renderTasks();
      }
    }
  }

  renderTasks() {
    let { tasks, element, _taskContainer } = this;
    let fragment = document.createDocumentFragment();
    
    for (let [key, value] of tasks) {
      fragment.appendChild(value.element);
    }


    removeChildrenNodes(_taskContainer);
    _taskContainer.appendChild(fragment);
  }
}
