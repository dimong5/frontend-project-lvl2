import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

export default (filepath) => {
  switch (path.extname((filepath))) {
    case '.json': return JSON.parse(fs.readFileSync(filepath), 'utf8');
    case '.yml': return yaml.safeLoad(fs.readFileSync(filepath), 'utf8');
    default: throw new Error('Unknown file extension');
  }
};
