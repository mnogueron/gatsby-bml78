import {createBasePage} from './utils.js';

export const createMultipleEntryPages = async ({
  graphql,
  actions: {createPage},
  queryPages,
  getContext,
}) => {
  const result = await queryPages(graphql);

  if (result.errors) {
    result.errors.forEach(e => console.error(e.toString()));
    return Promise.reject(result.errors);
  }

  result.data.allMarkdownRemark.edges.forEach(edge =>
    createBasePage({edge, createPage, getContext})
  );
};
