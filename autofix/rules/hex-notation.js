function hexNotation(tree) {
  let fixCount = 0;

  tree.traverse(function (node, index, parent) {
    if (node.is('color')) {
      if (/[a-z]/.test(node.content)) {
        node.content = node.content.toUpperCase();

        fixCount++;
      }
    }
  });

  return fixCount;
}

module.exports = hexNotation;
