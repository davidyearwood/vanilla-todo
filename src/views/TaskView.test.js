import {
  getByLabelText,
  getByText,
  getByTestId,
  queryByTestId,
  wait,
  getNodeText,
  queryByText
} from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

import TaskView from './TaskView';
import TaskModel from '../model/Task';
import createElement from '../utils/createElement';

let containerDOM = null;
let taskModel = null;
let taskView = null;

function getContainerDOM() {
  return createElement('div', {
    class: 'todo',
    id: '23132',
    'data-testid': 'todo-container'
  });
}

beforeEach(() => {
  containerDOM = getContainerDOM();
  document.documentElement.innerHTML = containerDOM.outerHTML;
  taskModel = new TaskModel();
  taskView = new TaskView({
    model: taskModel
  });
});

describe('The Task View instance', () => {
  describe('when a task is created', () => {
    it('should append that task to the element it belongs to', () => {
      let todoContainer = getByTestId(
        document.documentElement,
        'todo-container'
      );

      expect(todoContainer).toBeEmpty();

      let taskId = taskModel.create({
        title: 'Todo',
        description: 'This is a test element',
        belongsTo: '23132'
      });

      let taskUI = getByText(document.documentElement, 'Todo');

      expect(taskUI).toBeInstanceOf(HTMLElement);
    });
  });

  describe('when a task is updated', () => {
    it('should update the specified task ui', () => {
      let todoContainer = getByTestId(
        document.documentElement,
        'todo-container'
      );

      expect(todoContainer).toBeEmpty();

      let taskId = taskModel.create({
        title: 'Todo',
        description: 'This is a test element',
        belongsTo: '23132'
      });

      let taskUI = getByText(document.documentElement, 'Todo');

      taskModel.update(taskId, {
        title: 'doing'
      });

      expect(taskUI.textContent).toBe('doing');
    });
  });
});
