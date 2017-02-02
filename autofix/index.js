const gonzales = require('gonzales-pe');
const fs = require('fs');
const path = require('path');
const walkSync = require('walk-sync');
const yargs = require('yargs');
const rulesMethods = require('./rules');

const { log } = console;
let { rules, dir } = yargs.array('dir').array('rules').argv;

// process user inputs
rules = rules.map(rule => rule.replace(/-([a-z])/g, (m, w) => w.toUpperCase())); // camelCased

// configuration
const root = process.cwd();

// prepare lookup
const fixDirectories = dir;
const scssFiles = fixDirectories.reduce((currentFiles, directory) => {
  const directoryPath = path.join(root, directory);
  const directoryFiles = walkSync(directoryPath)
    .filter(file => path.extname(file) === '.scss')
    .map(file => path.join(directory, file));

  currentFiles.push(...directoryFiles);

  return currentFiles;
}, []);

// define statistics rule map
const fixStatistics = {};
rules.forEach(rule => {
  fixStatistics[rule] = 0;
});

// process fixing for each file
scssFiles.forEach(file => {
  const fullPath = path.join(root, file);
  const contents = fs.readFileSync(fullPath, { encoding: 'utf8' });

  if (contents.length == 0) {
    return;
  }

  const parsedTree = gonzales.parse(contents, { syntax: 'scss' });

  // for each rule, call with current file contents
  rules.forEach(rule => {
    const fixedCount = rulesMethods[rule](parsedTree);
    fixStatistics[rule] += fixedCount;
  });

  // write fixed content to file
  fs.writeFile(fullPath, parsedTree.toString(), error => {
    if (error) {
      console.log(error);
    }
  });
});

// display fix statistics
Object.keys(fixStatistics).forEach(rule => {
  console.log(`Fixed ${rule} warnings: ${fixStatistics[rule]}`);
});
