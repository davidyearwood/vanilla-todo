import {
  getByLabelText,
  getByText,
  getByTestId,
  queryByTestId,
  wait,
  getNodeText,
  queryByText
} from '@testing-library/dom'
// adds special assertions like toHaveTextContent
import '@testing-library/jest-dom/extend-expect'

import BucketView from './BucketView.js';
import BucketModel from '../model/Bucket.js';
import TaskModel from '../model/Task.js';
import createElement from '../utils/createElement.js';

let bm = null;
let bv = null;
let tm = null;
let containerDOM = null;

function getContainerDOM() {
  return createElement('div', {
    class: 'todo',
    id: 'todo'
  });
}

function getModelView(container) {
  let tm = new TaskModel();
  let bm = new BucketModel({
    children: tm
  });
  let bv = new BucketView({
    model: bm,
    container
  });

  return {
    tm,
    bm,
    bv
  }
}

beforeEach(() => {
  containerDOM = getContainerDOM();
  const modelView = getModelView(containerDOM);
  bm = modelView.bm;
  bv = modelView.bv;
  tm= modelView.tm;
});

test('Should add BucketComponent to the parent node', () => {
  let bucketId = bm.create({
    title: 'Todo'
  });

  let bucketNode = getByText(containerDOM, 'Todo');

  expect(bucketNode).toBeTruthy();
});

test('Should remove a BucketComponent from the parent node', () => {
  let todoId = bm.create({
    title: 'Todo'
  });

  let doingId = bm.create({
    title: 'Doing'
  });

  let doneId = bm.create({
    title: 'Done'
  });
  
  bm.delete(doneId);

  expect(queryByText(containerDOM, 'Done')).toBeFalsy();
});
