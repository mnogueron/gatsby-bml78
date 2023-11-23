import path from 'path';

export const getComponent = templateKey =>
  path.resolve(`src/templates/${String(templateKey)}.js`);
