const Task = require("./task");

class Tasks {
  constructor(tasks = []) {
    this._list = {};

    tasks.forEach(task => {
      this._list[task.id] = task;
    });
  }

  create (desc = '') {
    const task = new Task(desc);
    this._list[task.id] = task;
  }

  get list () {
    let list = [];
    Object.keys(this._list).forEach(key => {
      list.push(this._list[key]);
    });

    return list;
  }

  printList (completed = null) {
    console.log("\n");
    console.log(
      this.list
        .filter(
          task =>
            completed === null ||  // Filter all
            (completed && task.completionDate) ||  // Filter completed
            (!completed && !task.completionDate)  // Filter not completed
        )
        .map(
          (task, index) =>
            `${index + 1}. ${task.desc} :: ${task.completionDate ? "Completed".green : "Pending".red}`
        )
        .join("\n"));
  }

  delete (id) {
    if (id) {
      delete this._list[id];
    }
  }

  toggle (tasksId = []) { 
    tasksId.forEach(id => {
      if (!this._list[id].completionDate) {
        this._list[id].completionDate = new Date().toISOString();
      }
    });

    this.list.forEach(task => {
      if (!tasksId.includes(task.id)) {
        this._list[task.id].completionDate = null
      }
    });
  }
}

module.exports = Tasks;