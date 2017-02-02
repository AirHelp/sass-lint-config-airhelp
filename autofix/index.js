const gonzales = require('gonzales-pe');
const fs = require('fs');
const path = require('path');
const walkSync = require('walk-sync');
const yargs = require('yargs');
const rulesFix = require('./rules');

const { log } = console;

const { rules, fixDirectories } = yargs.array('dir').array('rules').argv;

// configuration
const root = path.join(path.dirname(require.main.filename), '..');

// prepare lookup
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
Object.keys(rules).forEach(rule => {
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
  Object.keys(rules).forEach(rule => {
    const fixedCount = rulesFix[rule](parsedTree);
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
