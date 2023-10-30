const Task = require('./Task');

/**
 * @typedef {Object} taskScheduler
 * @property {Task[]} tasks
 * @property {function(string): void} addTask
 * @property {function(number): void} markTaskAsCompleted
 * @property {function(): void} completeAllTasks
 * @property {function(): string} listTasks
 */
const taskScheduler = () => {
  /**
   * @type {Task[]}
   */
  const taskList = [];

  /**
   *
   * @param {string} desc
   */
  const addTask = (desc) => {
    taskList.push(new Task(desc));
  };

  /**
   * @param {number} index
   */
  const markTaskAsCompleted = (index) => {
    if (index >= 0 && index < taskList.length) {
      index = parseInt(index);
      taskList[index].completed = true;
    }
  };

  const completeAllTasks = () => {
    taskList.forEach((task) => {
      task.completed = true;
    });
  };

  const listTasks = () => {
    const taskListString = taskList.map((task, index) => {
      const status = task.isCompleted() ? '[X]' : '[ ]';
      return `${index + 1}. ${status} ${task.desc}`;
    });
    return `Tasks:\n${taskListString.join('\n')}`;
  };

  return {
    taskList,
    addTask,
    completeAllTasks,
    markTaskAsCompleted,
    listTasks,
  };
};

module.exports = taskScheduler;