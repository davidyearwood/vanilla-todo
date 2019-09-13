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
  return createElement(
    'div',
    {
      class: 'todo',
      id: '23132',
      'data-testid': 'todo-container'
    },
    [createElement('div', { class: 'dropzone' })]
  );
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
    it('should append task to the element it belongs to', () => {
      const title = 'Todo';
      const description = 'This is a test element';

      let taskId = taskModel.create({
        title,
        description,
        belongsTo: '23132'
      });

      let h1 = getByText(document.documentElement, title);
      let p = getByText(document.documentElement, description);

      expect(p.textContent).toBe(description);
      expect(h1.textContent).toBe(title);
      expect(p).toBeInstanceOf(HTMLElement);
      expect(h1).toBeInstanceOf(HTMLElement);
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

      expect(queryByText(document.documentElement, 'Todo')).toBeFalsy();
      expect(getByText(document.documentElement, 'doing').textContent).toBe(
        'doing'
      );
    });
  });

  describe('when a task is deleted', () => {
    it('should remove the task from the dom', () => {
      let taskId = taskModel.create({
        title: 'Todo',
        description: 'This is a test element',
        belongsTo: '23132'
      });

      taskModel.delete(taskId);

      expect(queryByText(document.documentElement, 'Todo')).toBeFalsy();
    });
  });

  describe('when a task is toggled', () => {
    it('should toggle to a form, if it was an element', () => {
      let taskId = taskModel.create({
        title: 'Todo',
        description: 'This is a test element',
        belongsTo: '23132'
      });

      taskView.update({
        action: 'toggle-task',
        payload: {
          id: taskId
        }
      });
      let form = getByTestId(document.documentElement, 'form');
      expect(form.dataset.id).toBe(taskId);
    });
    it('should not effect the data-for attribute', () => {
      let taskId = taskModel.create({
        title: 'Todo',
        description: 'This is a test element',
        belongsTo: '23132'
      });

      taskView.update({
        action: 'toggle-task',
        payload: {
          id: taskId
        }
      });
      let form = getByTestId(document.documentElement, 'form');
      expect(form.dataset.for).toBe('23132');
    });
    it('should have its description and title as values', () => {
      let taskId = taskModel.create({
        title: 'Todo',
        description: 'This is a test element',
        belongsTo: '23132'
      });

      taskView.update({
        action: 'toggle-task',
        payload: {
          id: taskId
        }
      });

      expect(getByTestId(document.documentElement, 'title-input').value).toBe(
        'Todo'
      );
      expect(
        getByTestId(document.documentElement, 'description-input').value
      ).toBe('This is a test element');
    });
    it('should toggle to an element, if it was a form', () => {
      let taskId = taskModel.create({
        title: 'Todo',
        description: 'This is a test element',
        belongsTo: '23132'
      });

      taskView.update({
        action: 'toggle-task',
        payload: {
          id: taskId
        }
      });

      taskView.update({
        action: 'toggle-task',
        payload: {
          id: taskId
        }
      });

      let taskElement = getByTestId(document.documentElement, 'task-element');
      let h1 = getByText(document.documentElement, 'Todo');
      let p = getByText(document.documentElement, 'This is a test element');

      expect(h1.textContent).toBe('Todo');
      expect(p.textContent).toBe('This is a test element');
      expect(taskElement.dataset.for).toBe('23132');
    });
  });
});
