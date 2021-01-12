import path from 'path';
import fs from 'fs';
import parseFileData from './parsers.js';
import format from './formatters/index.js';
import makeDiff from './makeDiff';

const defineFileFormat = (filepath) => {
  const fileExtension = path.extname(filepath);
  switch (fileExtension) {
    case '.json': return 'JSON';
    case '.yml': return 'YAML';
    default: throw new Error('Unknown file extension');
  }
};
export default (filepath1, filepath2, formatter = 'stylish') => {
  const configPath1 = path.resolve(filepath1);
  const configPath2 = path.resolve(filepath2);

  const firstConfigData = fs.readFileSync(configPath1);
  const secondConfigData = fs.readFileSync(configPath2);

  const object1 = parseFileData(firstConfigData, defineFileFormat(filepath1));
  const object2 = parseFileData(secondConfigData, defineFileFormat(filepath2));
  const diff = makeDiff(object1, object2);

  return format(diff, formatter);
};
