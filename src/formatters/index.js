import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default (diff, formatter) => {
  switch (formatter) {
    case 'stylish':
      // console.log(stylish(diff));
      return stylish(diff);
    case 'plain':
      // console.log(plain(diff));
      return plain(diff);
    case 'json':
      // console.log(json(diff));
      return json(diff);
    default:
      throw new Error(`Unknown formatter: '${formatter}'`);
  }
};
