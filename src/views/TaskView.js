import taskCreator from './task.js';

export default class TaskView {
  constructor(model) {
    this.creator = taskCreator;
    this.model = model; 
    this.model.register(this);
  }

  updateTask(id) {
    let task = document.getElementById(`task-${id}`);
    let parent = task.parentElement; 
    let taskData = this.model.get(id);
    let element; 
    switch (taskData.type) {
      case 'task-element':
        element = taskCreator.TaskComponent(taskData.props);
    }

    parent.replaceChild(element, task);
  }
  
  createTask(payload) {
    let task = this.model.get(payload.id);
    let taskElement = this.creator.content({
      id: task.id, 
      title: task.title,
      description: task.description,
      dataFor: task.dataFor
    });

    console.log(taskElement);
  }

  update(msg) {
    switch(msg.action) {
      case 'create-task':
        this.createTask(msg.payload);
        console.log(msg);
        break;
      case 'update-task':
        console.log(msg);
        break;
      case 'delete-task':
        console.log(msg);
        break;
    }
  }
}