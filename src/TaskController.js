import TaskModel from './model/Task';
import TaskView from './views/TaskView';

export default class TaskController {
  constructor(config) {
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
}