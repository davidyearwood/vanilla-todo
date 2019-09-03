import TaskModel from './Task.js';

let tm = null; 

beforeEach(() => {
  tm = new TaskModel();
  tm.create({
    title: 'Cook some fish',
    description: 'This is a test',
    belongsTo: 45,
    props: { class: 'task__name'}
  });
  tm.create({
    title: 'Test',
    description: 'This is a test 2',
    belongsTo: 22,
    props: { class: 'task__name'}
  });
  tm.create({
    title: 'Movies at 6',
    description: 'Simple test',
    belongsTo: 12,
    props: { class: 'task__name'}
  });
  tm.create({
    title: 'Task',
    description: 'testing 1, 2, 3',
    belongsTo: 12,
    props: { class: 'task__name'}
  })
});

test('Should add a task', () => {
  let id = tm.create({
    title: 'Cook some fish',
    description: 'This is a test',
    belongsTo: 45,
    props: { class: 'task__name'}
  });

  let task = tm.tasks.get(id);

  expect(task).toBeTruthy();
  expect(task.description).toBe('This is a test');
});

test('Should get a task by task id', () => {
  let id = tm.create({
    title: 'Project X',
    description: 'Super secrete task',
    belongsTo: 45, 
    props: { class: 'task__name'}
  });

  expect(tm.get(id).title).toBe('Project X');
});

test('Should throw an error when getting a task by a non-existing id' , () => {
  expect(() => {
    tm.get(21421421);
  }).toThrow();
});

test('Should delete a task by task id', () => {
  let tasks = tm.all();
  let task = tasks[0];
  let len = tasks.length; 

  let deletedTask = tm.delete(task.id);
  expect(len).toBeGreaterThan(tm.all().length);
  expect(task).toEqual(deletedTask);
});

test('Should update an exisiting task conteent', () => {
  let tasks = tm.all();
  let task = tasks[0];

  tm.update(task.id, { title: 'This is updated'});

  expect(task.title).toBe('This is updated');
});

test('Should throw an error when updating a non existent task', () => {
  expect(() => {
    tm.update(22313, { title: 'Update task '});
  }).toThrow();
});

test('Should get all tasks belonging to the same bucket', () => {
  let tasks = tm.getAllByBelongsTo(12);

  expect(tasks.length).toBe(2);
});

test('Should get no task belonging to a non-existing bucket', () => {
  let tasks = tm.getAllByBelongsTo(2141);

  expect(tasks.length).toBe(0);
});

test('Should get all tasks', () => {
  let tasks = tm.all();

  expect(tasks.length).toBe(4);
})