function leadingZero(tree) {
  let fixCount = 0;

  tree.traverse(function (node, index, parent) {
    if (node.is('number')) {
      if (/^\.\d+$/.test(node.content)) {
        node.content = '0' + node.content;

        fixCount++;
      }
    }
  });

  return fixCount;
}

module.exports = leadingZero;
