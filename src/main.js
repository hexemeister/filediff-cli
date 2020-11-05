#!/usr/bin/env node

const figlet = require("figlet");
const fs = require("fs");
const { promisify } = require("util");
const program = require("commander");
const package = require("../package.json");

const { pathToRows } = require("./pathToRows");
const { diffRows } = require("./diffRows");

const writeFile = promisify(fs.writeFile);

const DEFAULT_TARGET_FILENAME = "filediff.txt";

program.version(package.version, "-v, -V, --version", "show version");

console.log(figlet.textSync("Filediff", { font: "Slant" }));
console.log(`Created by ${package.author} and some others.\n`);

program
  .command("export <file1> <file2>", { isDefault: true })
  .description("export results to a new file")
  .option(
    "-t, --target <target-file>",
    "specify target file",
    DEFAULT_TARGET_FILENAME
  )
  .option("-i, --invert", "invert file1 with file2", false)
  .action(async (file1, file2, { target, invert }) => {
    let A = file1,
      B = file2;

    console.log(`Invert files: ${invert ? "On" : "Off"}`);

    if (invert) {
      A = file2;
      B = file1;
    }

    console.log("Filename1:", A);
    console.log("Filename2:", B);
    console.log("Target Filename:", target);

    const diff = await diffRows(A, B);

    await writeFile(target, diff);

    console.log("Done.");
  });

program.helpOption("-h, --help", "display help");

program.parse(process.argv);


