import stylish from './stylish.js';
import plain from './plain.js';

export default (diff, formatter) => {
  switch (formatter) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    default:
      throw new Error(`Unknown formatter: '${formatter}'`);
  }
};
