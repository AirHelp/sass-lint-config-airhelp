function quotes(tree) {
  let fixCount = 0;

  tree.traverse(function (node, index, parent) {
    if (node.is('string')) {
      const content = node.content;

      if (content.slice(0, 1) == '"' && content.slice(-1) == '"') {
        node.content = '\'' + content.slice(1, -1) + '\'';

        fixCount++;
      }
    }
  });

  return fixCount;
}

module.exports = quotes;
