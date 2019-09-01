import taskCreator from './views/task';

class Subject {
  constructor() {
    this.observers = [];
  }

  register(observer) {
    this.observers.push(observer);
  }

  unregister(observer) {
    this.observers = this.observers.filter(o => observer !== o);
  }

  notify(data) {
    this.observers.forEach((observer) => {
      observer.update(data);
    });
  }
}

class Task {
  constructor(data) {
    this.id = ID(); 
    this.title = data.title;
    this.description = data.description; 
    this.props = data.props; 
  }
}

class TaskModel extends Subject {
   constructor() {
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
     this.notify({action: 'create-task', payload: id});
   }

   update(id, data) {
     let task =  this.tasks.get(id);
     
     if (!task) {
       throw new Error('Task does not exist');
     }
     task = Object.assign(task, data);

     this.tasks.set(id, task);
     this.notify({action: 'update-task', payload: id});
   }

   delete(id) {
     this.tasks.delete(id);
     this.notify({action: 'delete-task', payload: id });
   }

   get(id) {
     return this.tasks.get(id);
   }

   all() {
     return Array.from(this.tasks.values());
   }

}

class TaskView {
  constructor(model) {
    this.model = new Model(); 
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

  update(msg) {
    switch(msg.action) {
      case 'create-task':
        this.createTask(msg.payload);
        break;
      case 'update-task':
        this.updateTask(msg.payload);
        break;
      case 'delete-task':
        this.removeTask(msg.payload);
        break;
    }
  }
}
