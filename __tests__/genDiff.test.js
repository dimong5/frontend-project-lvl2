import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
describe.each([
  [undefined, 'expected_file_stylish'],
  ['stylish', 'expected_file_stylish'],
  ['plain', 'expected_file_plain'],
  ['json', 'expected_file_json'],
])('formatter(%s)', (formatter, expected) => {
  test.each([
    ['file1.yml', 'file2.yml'],
    ['file1.json', 'file2.yml'],
    ['file1.yml', 'file2.yml'],
  ])('genDiff1(%s, %s)', (file1, file2) => {
    expect(genDiff(getFixturePath(file1), getFixturePath(file2), formatter))
      .toEqual(readFile(expected));
  });
});
