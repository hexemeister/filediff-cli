const { pathToRows } = require("./pathToRows")

async function diffRows(A, B) {
    const rowsA = await pathToRows(A);
    const rowsB = await pathToRows(B);
  
    const diff = rowsA.filter((value) => !rowsB.includes(value)).join("\n");
    return diff;
  }

  exports.diffRows = diffRows