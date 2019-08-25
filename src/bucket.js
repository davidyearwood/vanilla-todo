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
    this.tasks = new Map();
    this.id = ID();

    this.element = BucketComponent({
      id: this.id
    });

    this.title = createElement('h1', {
      class: 'bucket__title'
    }, config.title);

    this.taskCreatorForm = taskComponentCreator.createForm({ id: ID() });
    
    this.taskContainer = createElement('section', { class: 'tasks-list dropzone', 'data-for': this.id });
    
    this.element.appendChild(this.taskCreatorForm);
    this.element.appendChild(this.taskContainer);

    this.element.addEventListener('click', this.handleClick.bind(this));
    this.taskContainer.addEventListener('dragstart', this.handleDragStart.bind(this));
  }

  handleDragStart(e) {
    let data = JSON.stringify(this.getTask(e.target.dataset.id).props);
    e.dataTransfer.setData("application/data", data);
    e.dataTransfer.effectAllowed = "moved";
    e.dataTransfer.dropEffect = "move"; 
  }

  getTask(id) {
    return this.tasks.get(id);
  }

  addTask(props) {
    let { tasks } = this;
    let id = props.id ? props.id : ID();
    let modifiedProps = Object.assign(props, { id, dataFor: this.id });
    let task = taskComponentCreator.content(modifiedProps);

    tasks.set(id, {
      props: modifiedProps,
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
    let { tasks, element, taskContainer } = this;
    let fragment = document.createDocumentFragment();
    
    for (let [key, value] of tasks) {
      fragment.appendChild(value.element);
    }


    removeChildrenNodes(taskContainer);
    taskContainer.appendChild(fragment);
  }
}
