import _ from 'lodash';

const complexValueCheck = (value) => {
  if (!_.isPlainObject(value)) return `'${value}'`;
  return '[complex value]';
};
export default (diffTree) => {
  //console.log(diffTree);
  const iter = (tree, directory) => tree.flatMap((node) => {
    //console.log('tree!!!!!!!!!!!!!!!', tree);
    switch (node.type) {
      case 'added':
        return `Property '${directory}${node.key}' was added with value: ${complexValueCheck(node.value)}`;
      case 'deleted':
        return `Property '${directory}${node.key}' was removed`;
      case 'unchanged':
        return [];
      case 'changed':
        return `Property '${directory}${node.key}' was updated. From ${complexValueCheck(node.value[0])} to ${complexValueCheck(node.value[1])}`;
      case 'nested':
        return [...iter(node.children, `${directory}${node.key}.`)];
      default:
        throw new Error('Unknown type of node');
    }
  });
  console.log([...iter(diffTree, '')].join('\n'));
  return [...iter(diffTree, '')].join('\n');
};
