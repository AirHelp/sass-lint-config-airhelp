function hexNotation(tree) {
  let fixCount = 0;

  tree.traverse(function (node, index, parent) {
    if (node.is('string')) {
      if (/[a-z]/.test(node.content)) {
        const content = node.content;
        if (content.slice(0, 1) == '"' && content.slice(-1) == '"') {
          fixCount++;

          node.content = '\'' + content.slice(1, -1) + '\'';
        }
      }
    }
  });

  return fixCount;
}

module.exports = hexNotation;
