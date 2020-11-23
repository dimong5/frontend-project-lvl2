import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('genDiff', () => {
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
  console.log(readFile('file1.json'), 'read');
  console.log(getFixturePath('file1.json'), 'getFixturePath');
  console.log('result camparison\n', genDiff(getFixturePath('file1.json'), getFixturePath('file2.json')), readFile('expected_file'), '\n');
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(readFile('expected_file'));
});
