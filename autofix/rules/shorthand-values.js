const valueTypes = [
  'dimension',
  'number',
];

function shorthandValues(tree) {
  let fixCount = 0;

  tree.traverse(function (node, index, parent) {
    node.forEach('value', function (node, index, parent) {
      const valueContents = [];

      valueTypes.forEach(type => {
        node.forEach(type, (node, index, parent) => valueContents.push({ index, node }));
      });

      if (valueContents.length == 4) {
        // sort by index
        valueContents.sort((a, b) => a.index > b.index);

        const [v0, v1, v2, v3] = valueContents;

        if (valueContents.every(v => v.node.toString() == v0.node.toString())) {
          node.content.splice(v0.index + 1, v3.index - v0.index);

          fixCount++;
        } else if (v0.node.toString() == v2.node.toString() && v1.node.toString() == v3.node.toString()) {
          node.content.splice(v1.index + 1, v3.index - v1.index);

          fixCount++;
        } else if (v1.node.toString() == v3.node.toString()) {
          node.content.splice(v2.index + 1, v3.index - v2.index);

          fixCount++;
        }
      }
    });
  });

  return fixCount;
}

module.exports = shorthandValues;
