function spaceBeforeColon(tree) {
  let fixCount = 0;

  tree.traverse(function (node, index, parent) {
    let fixed = false;
    if (node.is('propertyDelimiter')) {
      while (true) {
        const previous = parent.get(index - 1);

        if (previous && previous.is('space')) {
          parent.removeChild(index - 1);

          fixed = true;
        } else {
          break;
        }
      }

      if (fixed) {
        fixCount++;
      }
    }
  });

  return fixCount;
}

module.exports = spaceBeforeColon;
