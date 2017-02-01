function hexLength(tree) {
  let fixCount = 0;

  tree.traverse(function (node, index, parent) {
    if (node.is('color')) {
      const content = node.content;

      if (content.length === 6 && /^(([A-Za-z0-6])\2{1}){3}$/.test(content)) {
        fixCount++;

        for (let i = 0 ; i < 3 ; i++) {
          node.content = node.content.substr(0, i + 1) + node.content.substr(i + 2);
        }
      }
    }
  });

  return fixCount;
}

module.exports = hexLength;
