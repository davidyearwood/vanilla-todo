import Model from './Model.js';
import ID from '../utils/ID.js';

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
     props: task.props
   };

    this.tasks.set(newTask.id, newTask);
    this.notify({action: 'create-task', payload: {id: newTask.id}});
  }

  update(id, data) {
    let task =  this.tasks.get(id);
    
    if (!task) {
      throw new Error('Task does not exist');
    }
    task = Object.assign(task, data);

    this.tasks.set(id, task);
    this.notify({action: 'update-task', payload: {id}});
  }

  delete(id) {
    this.tasks.delete(id);
    this.notify({action: 'delete-task', payload: {id} });
  }

  get(id) {
    return this.tasks.get(id);
  }

  all() {
    return Array.from(this.tasks.values());
  }

}
