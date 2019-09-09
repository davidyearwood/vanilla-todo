import taskCreator from './task.js';
import task from './task.js';

const CREATE_TASK = 'create-task';
const UPDATE_TASK = 'update-task';
const DELETE_TASK = 'delete-task';
const TOGGLE_TASK = 'toggle-task';

export default class TaskView {
  constructor({ model }) {
    this.creator = taskCreator; // creates elements
    this.model = model;
    this.model.register(this);
  }

  updateTask(payload) {
    let task = document.getElementById(`task-${payload.id}`);
    let parent = task.parentElement;
    let taskData = this.model.get(payload.id);
    let element;
    switch (taskData.type) {
      case 'task-element':
        element = taskCreator.TaskComponent(taskData.props);
    }
  }

  createTask(payload) {
    let task = this.model.get(payload.id);
    let taskElement = this.creator.content({
      id: task.id,
      title: task.title,
      description: task.description,
      dataFor: task.dataFor
    });

    let parentNode = document.getElementById(payload.belongsTo);

    parentNode.appendChild(taskElement);
  }

  deleteTask(payload) {
    let taskElement = document.querySelector(`#task-${payload.id}`);
    let { parentNode } = taskElement;
    if (taskElement) {
      parentNode.removeChild(task);
    }
  }

  toggleTask(payload) {
    let taskElement = document.querySelector(`#task-${payload.id}`);
    let { parentNode } = taskElement;
    let newElement = null;

    if (!taskElement) {
      return false;
    }

    let { dataType } = taskElement.dataset;
    let { id, title, description, dataFor } = payload;

    if (dataType === 'form') {
      newElement = this.creator.content({
        id,
        title,
        description,
        dataFor
      });
    } else {
      newElement = this.creator.editForm({
        id,
        title,
        description,
        dataFor
      });
    }

    parentNode.replaceChild(newElement, taskElement);
  }

  update(msg) {
    switch (msg.action) {
      case CREATE_TASK:
        this.createTask(msg.payload);
        break;
      case UPDATE_TASK:
        this.updateTask(msg.payload);
        console.log(msg);
        break;
      case DELETE_TASK:
        this.deleteTask(msg.payload);
        console.log(msg);
        break;
      case TOGGLE_TASK:
        this.toggleTask(msg.payload);
    }
  }
}
