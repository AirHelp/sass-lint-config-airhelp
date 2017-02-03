const gonzales = require('gonzales-pe');

const delimeterKeys = [
  'delimiter',
  'operator',
];

function spaceAfterComma(tree) {
  let fixCount = 0;

  tree.traverse(function (node, index, parent) {
    delimeterKeys.forEach(key => {
      if (node.is(key) && node.content == ',') {
        const next = parent.get(index + 1);

        if (!next || !next.is('space')) {
          const node = gonzales.createNode({ type: 'space', content: ' ' });

          parent.content.splice(index + 1, 0, node);

          fixCount++;
        }
      }
    });
  });

  return fixCount;
}

module.exports = spaceAfterComma;
