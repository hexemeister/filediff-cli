const fs = require("fs");

async function pathToRows(path) {
  try {
    return fs.readFileSync(path).toString("UTF-8").split("\n");
  } catch (e) {
    console.error(e);
  }
}

exports.pathToRows = pathToRows;
