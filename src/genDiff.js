import _ from 'lodash';
import fs from 'fs';

export default (filepath1, filepath2) => {
  const object1 = JSON.parse(fs.readFileSync(filepath1, 'utf8'));
  const object2 = JSON.parse(fs.readFileSync(filepath2, 'utf8'));

  const object1Keys = Object.keys(object1);
  const object2Keys = Object.keys(object2);
  const keysUniq = _.uniq(object1Keys.concat(object2Keys)).sort();

  const addToString = (str, data) => str.concat(`  ${data}`);

  const diff = keysUniq.reduce((acc, key) => {
    if (!_.has(object2, key)) {
      return addToString(acc, `- ${key}: ${object1[key]}\n`);
    }
    if (_.has(object2, key) && !_.has(object1, key)) {
      return addToString(acc, `+ ${key}: ${object2[key]}\n`);
    }
    if (object1[key] !== object2[key]) {
      return addToString(acc, `- ${key}: ${object1[key]}\n  + ${key}: ${object2[key]}\n`);
    }
    return addToString(acc, `  ${key}: ${object2[key]}\n`);
  }, '{\n');

  const diffClosed = diff.concat('}');

  console.log(diffClosed);
};
