import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test.each([
  ['file1.json', 'file2.json', 'expected_file_stylish'],
  ['file1.yml', 'file2.yml', 'expected_file_stylish'],
  ['file1.json', 'file2.yml', 'expected_file_stylish'],
])('genDiff(%s, %s) is equal to %s', (file1, file2, expected) => {
  expect(genDiff(getFixturePath(file1), getFixturePath(file2)))
    .toEqual(readFile(expected));
});

test.each([
  ['file1.json', 'file2.json', 'stylish', 'expected_file_stylish'],
  ['file1.yml', 'file2.yml', 'stylish', 'expected_file_stylish'],
  ['file1.json', 'file2.yml', 'plain', 'expected_file_plain'],
  ['file1.json', 'file2.yml', 'json', 'expected_file_json'],
])('genDiff1(%s, %s, %s) is equal to %s', (file1, file2, formatter, expected) => {
  expect(genDiff(getFixturePath(file1), getFixturePath(file2), formatter))
    .toEqual(readFile(expected));
});
