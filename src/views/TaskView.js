import taskCreator from './task.js';
import task from './task.js';

export default class TaskView {
  constructor(model) {
    this.creator = taskCreator;
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
  }

  deleteTask(payload) {
    let taskElement = document.getElementById(`task-${payload.id}`);
    taskElement.parentNode.removeChild(task);
  }

  update(msg) {
    switch(msg.action) {
      case 'create-task':
        this.createTask(msg.payload);
        console.log(msg);
        break;
      case 'update-task':
        this.updateTask(msg.payload);
        console.log(msg);
        break;
      case 'delete-task':
        this.deleteTask(msg.payload);
        console.log(msg);
        break;
    }
  }
}