const gonzales = require('gonzales-pe');

function emptyLineBetweenBlocks(tree) {
  let fixCount = 0;

  tree.traverse(function (node, index, parent) {
    if (node.is('ruleset') && index > 0) {
      const prev = parent.get(index - 1);

      // fix only if any of leading elements is anything than space
      let leadingIndex = index - 1;
      while (true) {
        if (!parent.get(leadingIndex).is('space')) {
          break;
        }

        if (--leadingIndex < 0) {
          return;
        }
      }

      if (prev && prev.is('space') && !/(\n){2}/.test(prev.content)) {
        prev.content = prev.content.replace('\n', '\n\n');

        fixCount++;
      } else if (!prev || !prev.is('space')) {
        const newLineNode = gonzales.createNode({ type: 'space', content: '\n' });
        parent.insert(index - 1, newLineNode);

        fixCount++;
      }
    }
  });

  return fixCount;
}

module.exports = emptyLineBetweenBlocks;
