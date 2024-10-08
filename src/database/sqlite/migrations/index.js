const sqliteConnection = require("../../sqlite");
const createUsers =  require("./CreateUsers");
async function migrationRUN () {
  const schemas = [
    createUsers
  ].join('');
  sqliteConnection().then(db => db.exec(schemas)).catch(error => console.error(error));
}

module.exports = migrationRUN;