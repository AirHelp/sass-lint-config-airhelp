const gonzales = require('gonzales-pe');

const braceAfterTypes = [
  'ident',
  'mixin',
  'function',
  'selector',
];

function spaceBeforeBrace(tree) {
  let fixCount = 0;

  tree.traverse(function (node, index, parent) {
    if (node.is('block')) {
      const prev = parent.get(index - 1);
      if (prev && braceAfterTypes.indexOf(prev.type) > -1) {
        const spaceNode = gonzales.createNode({ type: 'space', content: ' ' });

        parent.insert(index, spaceNode);

        fixCount++;
      }
    }
  });

  return fixCount;
}

module.exports = spaceBeforeBrace;
