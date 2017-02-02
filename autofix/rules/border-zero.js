const properties = [
  'border',
  'border-top',
  'border-right',
  'border-bottom',
  'border-left',
]

function borderZero(tree) {
  let fixCount = 0;

  tree.traverse(function (node, index, parent) {
    if (node.is('declaration')) {
      const ident = node.first('property').first('ident');
      const value = node.first('value');

      if (!ident || !value) {
        return;
      }

      if (properties.indexOf(ident.content) > -1 && value.content == 'none') {
        value.content = '0';

        fixCount++;
      }
    }
  });

  return fixCount;
}

module.exports = borderZero;
