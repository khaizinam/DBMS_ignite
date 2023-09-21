const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
class DBhandler {
  constructor() {
    this.entities = {};
  }
  async init() {
    const msg = [];
    await Promise.all(
      Object.keys(this.entities).map(async (name) => {
        const createTable = await this.entities[name].createTable();
        await this.entities[name].init();
        msg.push(createTable.msg);
      })
    );
    return msg.join(". ");
  }
}
const db = new DBhandler();
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const Entity = require(path.join(__dirname, file));
    const entity = new Entity();
    db.entities[entity._name] = entity;
  });

module.exports = db;
