import path from 'path';
import fs from 'fs';

export const getComponent = templateKey => {
  if (fs.existsSync(path.resolve(`src/templates/${String(templateKey)}.tsx`))) {
    return path.resolve(`src/templates/${String(templateKey)}.tsx`);
  }
  return path.resolve(`src/templates/${String(templateKey)}.js`);
};
