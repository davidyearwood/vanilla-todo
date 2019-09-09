import Model from './Model.js';
import ID from '../utils/ID.js';

/* 
 * Task Data {
 *  String Title,
 *  String Description
 *  String ID
 *  String belongsTo
 *  Object Props
 * }
 **/

let actions = {
  DELETE_TASK: 'delete-task',
  CREATE_TASK: 'create-task',
  UPDATE_TASK: 'update-task'
};

export default class TaskModel extends Model {
  constructor() {
    super();
    this.tasks = new Map();
  }

  create(task) {
    let newTask = {
      id: ID(),
      title: task.title,
      description: task.description,
      props: task.props,
      belongsTo: task.belongsTo
    };

    this.tasks.set(newTask.id, newTask);
    this.notify({
      action: actions.CREATE_TASK,
      payload: {
        id: newTask.id,
        belongsTo: task.belongsTo
      }
    });

    return newTask.id;
  }

  update(id, data) {
    let task = this.tasks.get(id);
    let { title, description, props, belongsTo } = data;

    if (!task) {
      throw new Error('Task does not exist');
    }

    task = Object.assign(task, {
      title: title || task.title,
      description: description || task.description,
      belongsTo: belongsTo || task.belongsTo,
      props: props || task.props
    });

    this.tasks.set(id, task);
    this.notify({
      action: actions.UPDATE_TASK,
      payload: {
        id
      }
    });
  }

  delete(id) {
    let task = this.tasks.get(id);

    if (task === undefined) {
      throw new Error(`Task ${id} doesn't exist`);
    }

    this.tasks.delete(id);
    this.notify({
      action: actions.DELETE_TASK,
      payload: { id, belongsTo: task.belongsTo }
    });

    return task;
  }

  get(id) {
    let task = this.tasks.get(id);

    if (task === undefined) {
      throw new Error(`Task ${id} doesn't exist`);
    }

    return task;
  }

  getAllByBelongsTo(id) {
    let tasks = this.all();

    return tasks.filter(task => task.belongsTo === id);
  }

  all() {
    return Array.from(this.tasks.values());
  }
}
