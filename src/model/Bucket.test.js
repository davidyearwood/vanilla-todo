import BucketModel from './Bucket.js';
import TaskModel from './Task.js';

let bm = null;
let tm = null;
let id1 = null;

beforeEach(() => {
  tm = new TaskModel();
  bm = new BucketModel({model: tm});

  id1 = bm.create({
    title: 'Todo',
  });

  let id2 = bm.create({
    title: 'Doing'
  });

  tm.create({
    title: 'Cook some fish',
    description: 'This is a test',
    belongsTo: id2,
    props: {
      class: 'task__name'
    }
  });

  tm.create({
    title: 'Test',
    description: 'This is a test 2',
    belongsTo: id1,
    props: {
      class: 'task__name'
    }
  });

  tm.create({
    title: 'Movies at 6',
    description: 'Simple test',
    belongsTo: id1,
    props: {
      class: 'task__name'
    }
  });
});

it('Should create a new bucket', () => {
  let id = bm.create({
    title: 'Done'
  });

  expect(bm.get(id)).toBeTruthy();
});

it('Should get all buckets', () => {
  let buckets = bm.all();

  expect(buckets.length).toBe(2);
});

it('Should get all tasks that belongs to a specifeid bucket', () => {
  let buckets = bm.get(id1);
  expect(buckets.tasks().length).toBe(2);
});

it('Should get a bucket by id', () => {
  expect(bm.get(id1)).toBeTruthy();
});