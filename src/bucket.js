import ID from './utils/ID.js';
import {
  BucketComponent, BucketTitleFormComponent
} from './views/bucket.js';
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
      class: 'bucket__title',
      'data-action': 'get-bucket-title-form',
      'data-id': ID()
    }, config.title);

    this.taskCreatorForm = taskComponentCreator.createForm({
      id: ID()
    });

    this.taskContainer = createElement('section', {
      class: 'tasks-list dropzone',
      'data-for': this.id
    });

    this.element.appendChild(this.title);
    this.element.appendChild(this.taskCreatorForm);
    this.element.appendChild(this.taskContainer);

    this.element.addEventListener('click', this.handleClick.bind(this));
    this.element.addEventListener('dragstart', this.handleDragStart.bind(this));
  }

  handleDragStart(e) {
    let data = JSON.stringify(this.getTask(e.target.dataset.id).props);
    console.log(data);
    e.dataTransfer.setData("application/data", data);
    e.dataTransfer.effectAllowed = "moved";
    e.dataTransfer.dropEffect = "move";
  }

  setTitle(props) {
    let newTitleElement = createElement('h1', {
      class: 'bucket__title',
      'data-action': 'get-bucket-title-form',
      'data-id': props.id
    }, props.title);

    this.element.replaceChild(newTitleElement, this.title);
    this.title = newTitleElement;
  }

  getTask(id) {
    return this.tasks.get(id);
  }

  addTask(props) {
    let {
      tasks
    } = this;
    let id = props.id ? props.id : ID();
    let modifiedProps = Object.assign(props, {
      id,
      dataFor: this.id
    });
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
    let {
      tasks,
      element
    } = this;
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

  handleActions(target, action) {
    let task;
    switch (action) {
      case 'update':
        task = this.tasks.get(target.getAttribute('data-id') || target.getAttribute('data-for'));
        this.updateTask(
          Object.assign(task.props, getFormValues(target.parentNode)),
          taskComponentCreator.content
        );
        this.renderTasks();
        break;
      case 'cancel': 
        task = this.tasks.get(target.getAttribute('data-id') || target.getAttribute('data-for'));
        this.updateTask(task.props, taskComponentCreator.content);
        this.renderTasks();
        break;
      case 'delete': 
        this.removeTask(target.getAttribute('data-id') || target.getAttribute('data-for'));
        this.renderTasks();
        break;
      case 'create': 
        this.addTask(Object.assign(getFormValues(target.parentNode), {
          id: ID()
        }));
        clearFormValues(target.parentNode);
        this.renderTasks();
        break;
      case 'get-bucket-title-form':
        let titleForm = BucketTitleFormComponent({
          id: this.title.dataset.id,
          title: this.title.textContent
        });
        this.element.replaceChild(titleForm, this.title);
        this.title = titleForm; 
        break;
      case 'get-task-form': 
        this.updateTask(this.tasks.get(target.dataset.id).props, taskComponentCreator.editForm);
        this.renderTasks();
        break;
      case 'update-bucket-title': 
        let formId = target.dataset.for;
        let input = document.getElementById(`bucket-form-title-${formId}`);
        this.setTitle({ id: formId, title: input.value });
        break;
    }
  }

  handleClick(e) {
    e.preventDefault();
    let {
      tasks,
      updateTask,
      renderTasks
    } = this;
    let {
      target
    } = e;
    let action = target.getAttribute('data-action');
    let id = target.getAttribute('data-id') || target.getAttribute('data-for');

    this.handleActions(target, action);
  }

  renderTasks() {
    let {
      tasks,
      element,
      taskContainer
    } = this;
    let fragment = document.createDocumentFragment();

    for (let [key, value] of tasks) {
      fragment.appendChild(value.element);
    }


    removeChildrenNodes(taskContainer);
    taskContainer.appendChild(fragment);
  }
}