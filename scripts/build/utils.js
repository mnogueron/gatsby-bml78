import path from 'path';
import fs from 'fs';
import {ALL_FEATHERS} from './feathers.js';

export const getComponent = templateKey => {
  if (fs.existsSync(path.resolve(`src/templates/${String(templateKey)}.tsx`))) {
    return path.resolve(`src/templates/${String(templateKey)}.tsx`);
  }
  return path.resolve(`src/templates/${String(templateKey)}.js`);
};

export const createBasePage = ({createPage, edge, getContext, getPath}) => {
  const {id, frontmatter, fields} = edge.node;
  const {title, templateKey, seo} = frontmatter;

  if (!templateKey) {
    return;
  }

  createPage({
    path: getPath ? getPath(edge) : fields.slug,
    component: getComponent(templateKey),
    // additional data can be passed via context
    context: {
      id,
      title,
      seo: {
        title: seo?.title || undefined,
        description: seo?.description || undefined,
        image: seo?.image?.childImageSharp?.fixed?.src || undefined,
      },
      templateKey,
      feather: ALL_FEATHERS.find(f => f.location === fields.slug),
      hiddenCheck:
        process.env.NODE_ENV === 'development'
          ? [null, false, true]
          : [null, false],
      ...(getContext ? getContext(edge) : {}),
    },
  });
};
