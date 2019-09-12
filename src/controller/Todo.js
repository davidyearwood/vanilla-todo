import TaskView from '../views/TaskView.js';
import TaskModel from '../model/Task.js';

const CREATE_TASK = 'create-task';
const UPDATE_TASK = 'update-task';
const DELETE_TASK = 'delete-task';
const TOGGLE_TASK = 'toggle-task';

export default class TodoController {
  constructor(options) {
    this.container = options.container;
    this.taskModel = new TaskModel();
    this.taskView = new TaskView({ model: this.taskModel });
    this.container.addEventListener('click', this.handleClick.bind(this));

    this.taskModel.create({
      title: 'Todo',
      description: 'This is a test',
      belongsTo: 'entry'
    });
  }

  handleClick(event) {
    event.preventDefault();
    let { target } = event;
    let { action } = target.dataset;
    let id = target.dataset.id || target.dataset.for;

    switch (action) {
      case UPDATE_TASK:
        let data = {
          title: document.getElementById(`task-title-${id}`).value,
          description: document.getElementById(`task-description-${id}`).value
        };
        this.taskModel.update(id, data);
        break;
      case TOGGLE_TASK:
        this.taskView.update({
          action: TOGGLE_TASK,
          payload: {
            id
          }
        });
        break;
      case DELETE_TASK:
        this.taskModel.delete(id);
        break;
    }
  }
}
