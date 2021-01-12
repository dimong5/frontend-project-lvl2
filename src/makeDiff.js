import _ from 'lodash';

const makeDiff = (obj1, obj2) => {
  const keysUniq = _.union(Object.keys(obj1), Object.keys(obj2));
  const keysUniqSorted = _.sortBy(keysUniq);
  return keysUniqSorted.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (!_.has(obj2, key)) {
      return { key, value: value1, type: 'deleted' };
    }
    if (!_.has(obj1, key)) {
      return { key, value: value2, type: 'added' };
    }
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      const children = makeDiff(value1, value2);
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
export default makeDiff;
