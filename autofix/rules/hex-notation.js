function hexNotation(tree) {
  let fixCount = 0;

  tree.traverse(function (node, index, parent) {
    if (node.is('color')) {
      if (/[a-z]/.test(node.content)) {
        fixCount++;

        node.content = node.content.toUpperCase();
      }
    }
  });

  return fixCount;
}

module.exports = hexNotation;
