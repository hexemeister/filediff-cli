const fs = require("fs");
const { promisify } = require("util");

exports.writeFile = promisify(fs.writeFile);
