const inquirer = require("inquirer");
require("colors");

const choices = [

  { value: "1", name: "Make a task" },
  { value: "2", name: "List tasks" },
  { value: "3", name: "List completed tasks" },
  { value: "4", name: "List pending tasks" },
  { value: "5", name: "Toggle tasks" },
  { value: "6", name: "Delete task" },
  { value: "7", name: "Exit" },
];

const options = [
  {
    type: 'list',
    name: "option",
    message: "What would you like to do?",
    choices: choices.map(choice => ({
      value: choice.value,
      name: `${choice.value.green}. ${choice.name}`
    }))
  },
];

const showMenu = async () => {
  console.clear();

  "List completed tasks";

  console.log("==============================".green);
  console.log(" Select an option ".white);
  console.log("==============================".green);

  console.log("\n");
  return await inquirer.prompt(options);
};

const pause = async () => {
  console.log("\n");

  return await inquirer.prompt([
    {
      type: 'input',
      name: 'key',
      message: `Press ${"ENTER".green} to continue `,
    }]);
};

const readInput = async (message) => {
  return await inquirer.prompt(
    [
      {
        'type': 'input',
        'name': 'desc',
        message,
        validate (value) {
          if (value.length === 0) {
            return "Please enter a value";
          }

          return true;
        }
      }
    ]
  );

};

const showMenuTasks = async (tasks) => {
  const choices = tasks.map((task, index) => ({
    value: task.id,
    name: `${index + 2}`.green + `. ${task.desc}`
  }));

  choices.unshift({
    value: null,
    name: "1.".green + " Cancelar"
  });

  console.clear();

  console.log("=========================".green);
  console.log(" Task to delete ".white);
  console.log("=========================".green);

  console.log("\n");

  const { task } = await inquirer.prompt(
    [
      {
        type: 'list',
        name: "task",
        message: "Select a task to delete",
        choices
      },
    ]
  );

  return task;
};

const confirm = async (message) => {
  console.log("\n");
  const { ok } = await inquirer.prompt([
    {
      type: 'confirm',
      name: "ok",
      message: message,
    },
  ]);

  return ok;
};

const showMenuTasksCheckList = async (tasks = []) => {
  const choices = tasks.map((task, index) => ({
    value: task.id,
    name: `${index + 1}`.green + `. ${task.desc}`,
    checked: !!task.completionDate
  }));

  const { tasksId } = await inquirer.prompt(
    [
      {
        type: 'checkbox',
        name: "tasksId",
        message: "Select a tasks to complete",
        choices
      },
    ]
  );

  return tasksId;
};

module.exports = {
  showMenu,
  pause,
  readInput,
  showMenuTasks,
  confirm,
  showMenuTasksCheckList
};