import _ from 'lodash';
import fs from 'fs';
import path from 'path';

export default (filepath1, filepath2) => {

  const absolutePath1 = path.resolve(filepath1);
  const absolutePath2 = path.resolve(filepath2);
  const object1 = JSON.parse(fs.readFileSync(absolutePath1, 'utf8'));
  const object2 = JSON.parse(fs.readFileSync(absolutePath2, 'utf8'));

  const object1Keys = Object.keys(object1);
  const object2Keys = Object.keys(object2);
  const keysUniq = _.uniq(object1Keys.concat(object2Keys)).sort();

  const diff = keysUniq.reduce((acc, key) => {
    if (!_.has(object2, key)) {
      return [...acc, { [`- ${key}`]: object1[key] }];
    }
    if (!_.has(object1, key)) {
      return [...acc, { [`+ ${key}`]: object2[key] }];
    }
    if (object1[key] !== object2[key]) {
      return [...acc, { [`- ${key}`]: object1[key] }, { [`+ ${key}`]: object2[key] }];
    }
    return [...acc, { [`  ${key}`]: object2[key] }];
  }, []);

  const diffToString = diff.reduce((acc, obj) => {
    const extractedEntries = Object.entries(obj);
    const [key, value] = extractedEntries.flat();
    return acc.concat(`  ${key}: ${value}\n`);
  }, '{\n');
  console.log(diffToString);

  return diffToString.concat('}');
};
