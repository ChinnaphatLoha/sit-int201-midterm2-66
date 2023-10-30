const Task = require('./Task');

describe('Task', () => {
  test('Task should be created with given description', () => {
    const task = new Task('Sample Task');
    expect(task.desc).toBe('Sample Task');
    expect(task.isCompleted()).toBe(false);
  });

  test('Task should be marked as completed', () => {
    const task = new Task('Sample Task');
    task.completed = true;
    expect(task.isCompleted()).toBe(true);
  });
});
