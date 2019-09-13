import TaskView from '../views/TaskView.js';
import BucketView from '../views/BucketView.js';
import TaskModel from '../model/Task.js';
import BucketModel from '../model/Bucket.js';
import { throttle, debounce } from '../utils/throttle-debounce.js';

// Actions
const CREATE_TASK = 'create-task';
const UPDATE_TASK = 'update-task';
const DELETE_TASK = 'delete-task';
const TOGGLE_TASK = 'toggle-task';
const DELETE_BUCKET = 'delete-bucket';
const CREATE_BUCKET = 'create-bucket';

const DROPZONE_CLASS = 'dropzone';
const MIME_TYPE_JSON = 'application/json';

export default class TodoController {
  constructor(options) {
    this.container = options.container;
    this.taskModel = new TaskModel();
    this.taskView = new TaskView({
      model: this.taskModel
    });

    this.bucketModel = new BucketModel({
      children: this.taskModel
    });

    this.bucketView = new BucketView({
      model: this.bucketModel,
      container: this.container
    });

    this.container.addEventListener('click', this.handleClick.bind(this));
    this.container.addEventListener(
      'dragstart',
      this.handleDragStart.bind(this)
    );
    this.container.addEventListener(
      'dragover',
      throttle(100, this.handleDragover.bind(this))
    );
    this.container.addEventListener('drop', this.handleDrop.bind(this));

    this.bucketModel.create({
      title: 'Todo'
    });

    this.bucketModel.create({
      title: 'Doing'
    });
  }

  handleDragStart(event) {
    let { target } = event;
    if (!target.draggable) {
      return null;
    }
    // defines the data that is being dragged
    event.dataTransfer.setData(
      MIME_TYPE_JSON,
      JSON.stringify({
        belongsTo: target.dataset.for,
        id: target.dataset.id
      })
    );

    event.dataTransfer.dropEffect = 'move';
  }

  handleDragover(event) {
    event.preventDefault();
    let { target } = event;
    console.log(target);
    if (!target.classList.contains(DROPZONE_CLASS)) {
      return null;
    }
    event.dataTransfer.dropEffect = 'move';
  }

  handleDrop(event) {
    event.preventDefault();
    let { target } = event;
    console.log(target);
    if (!target.classList.contains(DROPZONE_CLASS)) {
      return null;
      console.log('Not a dropped area');
    }
    let data = JSON.parse(event.dataTransfer.getData(MIME_TYPE_JSON));
    console.log(data);
  }

  handleClick(event) {
    event.preventDefault();
    let { target } = event;
    let { action } = target.dataset;
    let id = target.dataset.id || target.dataset.for;
    let data = null;
    switch (action) {
      case UPDATE_TASK:
        data = {
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
      case CREATE_TASK:
        let form = target.parentNode;
        let bucket = document.getElementById(form.dataset.for);
        data = {
          title: document.getElementById(`task-title-${id}`).value,
          description: document.getElementById(`task-description-${id}`).value,
          belongsTo: bucket.dataset.id
        };
        this.taskModel.create(data);
        break;
    }
  }
}
