import yaml from 'js-yaml';

export default (data, format) => {
  switch (format) {
    case 'JSON': return JSON.parse(data);
    case 'YAML': return yaml.safeLoad(data);
    default: throw new Error('Unknown data format');
  }
};
