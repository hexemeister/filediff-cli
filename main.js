#!/usr/bin/env node

const figlet = require('figlet')
const fs = require('fs')
const program = require('commander')
const package = require('./package.json')

const file1 = 'Julho - Ambulatório - 6.969.txt'
const file2 = 'Julho - Ambulatório - 6.983.txt'
const DEFAULT_TARGET_FILENAME = 'filediff.txt'

program.version(package.version, '-v, -V, --version', 'show version')

console.log(figlet.textSync('Filediff', {font: 'Slant'}))
console.log(`Created by ${package.author}\n`)

program
    .command('export <file1> <file2>', { isDefault: true})
    .description('export results to a new file')
    .option('-t, --target <target-file>', 'specify target file', DEFAULT_TARGET_FILENAME)
    .option('-i, --invert', 'invert file1 with file2')
    .action( (file1, file2, {target=DEFAULT_TARGET_FILENAME} ) => {
        if (program.commands[0].invert) {
            console.log('Invert files: On')
            let tempFilename = file1
            file1 = file2
            file2 = tempFilename
        }
        console.log('Filename1:', file1)
        console.log('Filename2:', file2)
        console.log('Target Filename:', target)
        let diff = pathToRows(file1).then(w => 
            pathToRows(file2).then(e => w
                .filter( x => !e.includes(x))
               // .concat( e.filter( x => !w.includes(x)))
            )
        )
        diff.then(x => fs.writeFile(target, x, () => console.log('Done.')) )
    })

program.helpOption('-h, --help', 'display help')

function pathToRows(path) {
    return new Promise((resolver, reject) => {
        try {
            const rows = fs.readFileSync(path).toString('UTF-8')
            .split('\n')
            resolver(rows)
        } catch(e) {
            reject(e)
        }
    })
}

program.parse(process.argv)
const p = program.args

// console.log(p)

/*console.log(fs.readdirSync(__dirname)[0])*/
/*
console.log(figlet.textSync("Hello World", {font: 'Ghost'}))

var inquirer = require('inquirer')

inquirer.prompt([
    {
        type: 'list',
        name: 'teste',
        message: 'Qual arquivo?',
        choices: [
            'file1',
            'file2',
            file1,
            file2,
        ],
        filter: function(val){
            return val
        }
    }
]).then((answers) => {
    console.log(`Resposta: ${answers.teste}`)
})
*/
/*
let diff = rows(file1).then(w => 
    rows(file2).then(e => w
        .filter( x => !e.includes(x))
       // .concat( e.filter( x => !w.includes(x)))
    )
)


diff.then(x => console.log(x))
*/