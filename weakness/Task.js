const { v4: uuidv4 } = require('uuid');

class Task {
  /**
   * @param {string} id
   * @param {string} desc
   * @param {boolean} completed
   * @returns {Task}
   * @constructor
   */
  constructor(desc) {
    this._id = uuidv4();
    this._desc = desc;
    this._completed = false;
  }

  /**
   * @returns {string}
   */
  get id() {
    return this._id;
  }

  /**
   * @returns {string}
   */
  get desc() {
    return this._desc;
  }

  /**
   *
   * @returns {boolean}
   */
  isCompleted() {
    return this._completed;
  }

  /**
   * @param {boolean} completed
   */
  set completed(completed) {
    this._completed = completed;
  }
}



module.exports = Task;