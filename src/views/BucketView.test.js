import {
  getByLabelText,
  getByText,
  getByTestId,
  queryByTestId,
  wait,
  getNodeText,
  queryByText
} from '@testing-library/dom';
// adds special assertions like toHaveTextContent
import '@testing-library/jest-dom/extend-expect';

import BucketView from './BucketView.js';
import BucketModel from '../model/Bucket.js';
import TaskModel from '../model/Task.js';
import createElement from '../utils/createElement.js';

let bucketModel = null;
let bucketView = null;
let containerDOM = null;

function getContainerDOM() {
  return createElement('div', {
    class: 'todo',
    id: 'todo'
  });
}

function getBucketModel(model) {
  let bucketModel = new BucketModel({
    children: model
  });

  return bucketModel;
}

beforeEach(() => {
  containerDOM = getContainerDOM();
  bucketModel = getBucketModel(new TaskModel());
  bucketView = new BucketView({ model: bucketModel, container: containerDOM });
});

it('Should add BucketComponent to the parent node', () => {
  let bucketId = bucketModel.create({
    title: 'Todo'
  });

  let bucketNode = getByText(containerDOM, 'Todo');

  expect(bucketNode).toBeTruthy();
});

it('Should remove a BucketComponent from the parent node', () => {
  let id = bucketModel.create({
    title: 'Done'
  });

  bucketModel.delete(id);

  expect(queryByText(containerDOM, 'Done')).toBeFalsy();
});
