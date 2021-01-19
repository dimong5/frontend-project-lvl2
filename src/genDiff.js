import path from 'path';
import fs from 'fs';
import parseFileData from './parsers.js';
import format from './formatters/index.js';
import makeDiff from './makeDiff.js';

const defineFileFormat = (filepath) => {
  const fileType = path.extname(filepath).split('.')[1];

  switch (fileType) {
    case 'json': return 'json';
    case 'yml': return 'yaml';
    default: throw new Error('Unknown file extension');
  }
};
export default (filepath1, filepath2, formatter = 'stylish') => {
  const configPath1 = path.resolve(filepath1);
  const configPath2 = path.resolve(filepath2);

  const configData1 = fs.readFileSync(configPath1);
  const configData2 = fs.readFileSync(configPath2);

  const object1 = parseFileData(configData1, defineFileFormat(configPath1));
  const object2 = parseFileData(configData2, defineFileFormat(configPath2));
  const diff = makeDiff(object1, object2);

  return format(diff, formatter);
};
