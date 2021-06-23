require("colors");

const showMenu = () => {
  return new Promise(resolve => {
    console.clear();

    console.log("=======================".green);
    console.log(" Select an option ".green);
    console.log("=======================".green);

    let tasks = [
      { number: "1", label: "Make a task" },
      { number: "2", label: "List tasks" },
      { number: "3", label: "List completed tasks" },
      { number: "4", label: "List pending tasks" },
      { number: "5", label: "Finish task" },
      { number: "6", label: "Delete task" },
      { number: "0", label: "Exit\n" },
    ];

    tasks.forEach((task) => {
      console.log(`${task.number.green}. ${task.label}`);
    });

    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    readline.question("Option: ", (option) => {
      readline.close();
      resolve(option);
    });
  }
  );
};

const pause = () => {
  return new Promise(resolve => {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  readline.question(`Press ${"ENTER".green} to continue `, () => {
    readline.close();
    resolve();
  });
})
};

module.exports = {
  showMenu,
  pause
};