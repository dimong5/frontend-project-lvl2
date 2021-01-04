import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
test('genDiff JSON files stylish formatter', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json')))
    .toEqual(readFile('expected_file_stylish'));
});
test('genDiff YAML files stylish formatter', () => {
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml')))
    .toEqual(readFile('expected_file_stylish'));
});
test('genDiff JSON files plain formatter', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain'))
    .toEqual(readFile('expected_file_plain'));
});
test('genDiff YAML files plain formatter', () => {
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain'))
    .toEqual(readFile('expected_file_plain'));
});
test('genDiff JSON files json formatter', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json'))
    .toEqual(readFile('expected_file_json'));
});
test('genDiff YAML files json formatter', () => {
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'json'))
    .toEqual(readFile('expected_file_json'));
});
