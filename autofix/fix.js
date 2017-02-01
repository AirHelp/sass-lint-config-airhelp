const gonzales = require('gonzales-pe');
const fs = require('fs');
const path = require('path');
const rules = require('./rules');
const walkSync = require('walk-sync');

const root = path.join(path.dirname(require.main.filename), '..');

const fixDirectories = [
  'app/components',
  'app/styles',
  '../app/assets/stylesheets',
];

const scssFiles = fixDirectories.reduce((currentFiles, directory) => {
  const directoryPath = path.join(root, directory);
  const directoryFiles = walkSync(directoryPath)
    .filter(file => path.extname(file) === '.scss')
    .map(file => path.join(directory, file));

  currentFiles.push(...directoryFiles);

  return currentFiles;
}, []);

// create statistics rule map
const fixStatistics = {};
Object.keys(rules).forEach(rule => {
  fixStatistics[rule] = 0;
});

// for each file
scssFiles.forEach(file => {
  const fullPath = path.join(root, file);
  const contents = fs.readFileSync(fullPath, { encoding: 'utf8' });

  if (contents.length == 0) {
    return;
  }

  const parsedTree = gonzales.parse(contents, { syntax: 'scss' });

  // for each rule, call with current file contents
  Object.keys(rules).forEach(rule => {
    const fixedCount = rules[rule](parsedTree);
    fixStatistics[rule] += fixedCount;
  });

  // write fixed content to file
  fs.writeFile(fullPath, parsedTree.toString(), error => {
    if (error) {
      console.log(error);
    }
  });
});

Object.keys(fixStatistics).forEach(rule => {
  console.log(`Fixed ${rule} warnings: ${fixStatistics[rule]}`);
});
