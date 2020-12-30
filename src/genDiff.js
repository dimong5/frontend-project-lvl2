import _ from 'lodash';
import path from 'path';
import parseFileFormat from './utils/parsers.js';
import stylish from './utils/stylish.js';
import plain from './utils/plain.js';

export default (filepath1, filepath2, formatter = 'stylish') => {
  const absolutePath1 = path.resolve(filepath1);
  const absolutePath2 = path.resolve(filepath2);

  const object1 = parseFileFormat(absolutePath1);
  const object2 = parseFileFormat(absolutePath2);

  const calculateDiff = (obj1, obj2) => {
    const object1Keys = Object.keys(obj1);
    const object2Keys = Object.keys(obj2);
    const keysUniq = _.uniq(object1Keys.concat(object2Keys)).sort();

    return keysUniq.map((key) => {
      const value1 = obj1[key];
      const value2 = obj2[key];
      if (!_.has(obj2, key)) {
        return { key, value: value1, type: 'deleted' };
      }
      if (!_.has(obj1, key)) {
        return { key, value: value2, type: 'added' };
      }
      if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
        const children = calculateDiff(value1, value2);
        return {
          key,
          children,
          value: 'nested',
          type: 'nested',
        };
      }

      if (!_.isEqual(value1, value2)) {
        return { key, value: [value1, value2], type: 'changed' };
      }
      return { key, value: value2, type: 'unchanged' };
    });
  };

  const diff = calculateDiff(object1, object2);
  // console.log('plain\n', plain(diff));
  // console.log('formatter', typeof (formatter));
  switch (formatter) {
    case 'stylish': return stylish(diff);
    case 'plain': return plain(diff);
    default: throw new Error('Unknown formatter');
  }
};
