import _ from 'lodash';

const complexValueCheck = (value) => {
  if (typeof (value) === 'string') return `'${value}'`;
  if (!_.isPlainObject(value)) return value;
  return '[complex value]';
};
export default (diffTree) => {
  const iter = (tree, path) => tree.flatMap((node) => {
    switch (node.type) {
      case 'added':
        return `Property '${path}${node.key}' was added with value: ${complexValueCheck(node.value)}`;
      case 'deleted':
        return `Property '${path}${node.key}' was removed`;
      case 'unchanged':
        return [];
      case 'changed':
        return `Property '${path}${node.key}' was updated. From ${complexValueCheck(node.value[0])} to ${complexValueCheck(node.value[1])}`;
      case 'nested': {
        const currentPath = `${path}${node.key}.`;
        return [...iter(node.children, currentPath)];
      }
      default:
        throw new Error('Unknown type of node');
    }
  });
  console.log([...iter(diffTree, '')].join('\n'));
  return [...iter(diffTree, '')].join('\n');
};
