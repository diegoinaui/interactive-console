const fs = require("fs");

const dir = "./db";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const file = `${dir}/data.json`;

const save = (data) => {

  fs.writeFileSync(file, JSON.stringify(data));
};

const read = () => {
  if (!fs.existsSync(file)) {
    return [];
  }

  return JSON.parse(fs.readFileSync(file, { encoding: 'utf-8' }));
};

module.exports = {
  save,
  read
};