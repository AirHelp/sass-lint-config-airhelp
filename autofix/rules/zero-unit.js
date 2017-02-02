function zeroUnit(tree) {
  let fixCount = 0;

  tree.traverse(function (node, index, parent) {
    if (node.is('dimension')) {
      if (node.content.length == 2) {
        const number = node.get(0);
        const ident = node.get(1);

        if (number == '0') {
          node.removeChild(1);

          fixCount++;
        }
      }
    }
  });

  return fixCount;
}

module.exports = zeroUnit;
