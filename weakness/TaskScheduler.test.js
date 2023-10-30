const taskScheduler = require('./TaskScheduler');

describe('TaskScheduler', () => {
  let scheduler;

  beforeEach(() => {
    scheduler = taskScheduler();
  });

  test('Tasks should be added to the scheduler', () => {
    scheduler.addTask('Task 1');
    scheduler.addTask('Task 2');
    expect(scheduler.taskList.length).toBe(2);
  });

  test('Tasks should be marked as completed', () => {
    scheduler.addTask('Task 1');
    scheduler.markTaskAsCompleted(0);
    expect(scheduler.taskList[0].isCompleted()).toBe(true);
  });

  test('All tasks should be marked as completed', () => {
    scheduler.addTask('Task 1');
    scheduler.addTask('Task 2');
    scheduler.completeAllTasks();
    expect(scheduler.taskList.every((task) => task.isCompleted())).toBe(true);
  });

  test('Tasks should be listed correctly', () => {
    scheduler.addTask('Task 1');
    scheduler.addTask('Task 2');
    const taskList = scheduler.listTasks();
    const expectedOutput = 'Tasks:\n1. [ ] Task 1\n2. [ ] Task 2';
    expect(taskList).toBe(expectedOutput);
  });
});
