const { showMenu, pause, readInput, showMenuTasks, confirm, showMenuTasksCheckList } = require('./helpers/inquirer');
const storage = require('./helpers/storage');

const Tasks = require("./models/tasks");

const main = async () => {
  let selected = null;
  let id = null;

  const tasks = new Tasks(storage.read());

  do {
    selected = await showMenu();

    switch (selected.option) {
      case "1":
        const input = await readInput('Description: ');
        tasks.create(input.desc);
        break;
      case "2":
        tasks.printList();
        break;
      case "3":
        tasks.printList(true);
        break;
      case "4":
        tasks.printList(false);
        break;
      case "5":
        let tasksId = await showMenuTasksCheckList(tasks.list);

        if (tasksId.length && await confirm("Do you want to complete the selected tasks?")) {
          tasks.toggle(tasksId);
        }

        break;
      case "6":
        id = await showMenuTasks(tasks.list);

        if (id && await confirm("Do you want to delete the selected task?")) {
          tasks.delete(id);
        }

        break;
    }

    storage.save(tasks.list);

    if (selected.option !== "7") await pause();

  } while (selected.option !== "7");
};

main();
