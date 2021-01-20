import _ from 'lodash';

const indentSize = 4;

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) return value;
  const currentIndent = ' '.repeat(depth * indentSize);
  const bracketIndent = ' '.repeat(depth * indentSize - indentSize);
  const lines = Object
    .entries(value).map(([key, val]) => `${currentIndent}${key}: ${stringify(val, depth + 1)}`);
  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

const stylish = (diffTree) => {
  const iter = (tree, depth) => tree.flatMap((node) => {
    const currentIndent = ' '.repeat(depth * indentSize - 2);
    const bracketIndent = ' '.repeat(depth * indentSize);
    switch (node.type) {
      case 'added':
        return `${currentIndent}+ ${node.key}: ${stringify(node.value, depth + 1)}`;
      case 'deleted':
        return `${currentIndent}- ${node.key}: ${stringify(node.value, depth + 1)}`;
      case 'unchanged':
        return `${currentIndent}  ${node.key}: ${stringify(node.value, depth + 1)}`;
      case 'changed':
        return [`${currentIndent}- ${node.key}: ${stringify(node.value[0], depth + 1)}`,
          `${currentIndent}+ ${node.key}: ${stringify(node.value[1], depth + 1)}`];
      case 'nested':
        return [`${currentIndent}  ${node.key}: {`,
          ...iter(node.children, depth + 1), `${bracketIndent}}`];
      default:
        throw new Error('Unknown type of node');
    }
  });
  return ['{', ...iter(diffTree, 1), '}'].join('\n');
};
export default stylish;
