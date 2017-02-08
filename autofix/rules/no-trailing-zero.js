function noTrailingZero(tree) {
  let fixCount = 0;

  tree.traverse(function (node, index, parent) {
    node.forEach('number', function (node, index, parent) {
      if (/^.*\..*?0+$/.test(node.content)) {
        node.content = node.content.replace(/^(.*)\.(0+)$/, '$1');
        node.content = node.content.replace(/^(.*\..+?)(0+)$/, '$1');

        fixCount++;
      }
    });
  });

  return fixCount;
}

module.exports = noTrailingZero;
