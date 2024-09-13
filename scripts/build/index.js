import {createMultipleEntryPages} from './createMultipleEntryPages.js';
import {createPaginatedPage} from './createPaginatedPage.js';
import {
  queryAll,
  queryArticles,
  querySinglePage,
  queryResults,
  queryAllVideosPage,
} from './queries/index.js';

export const createPages = async ({graphql, actions}) => {
  await createMultipleEntryPages({
    graphql,
    actions,
    queryPages: queryAll([
      'article-page',
      'result-page',
      'all-results-page',
      'articles-pages',
      'all-videos-page',
    ]),
  });
  await createPaginatedPage({
    graphql,
    actions,
    queryPage: querySinglePage('articles-page'),
    getEntriesLength: async ({graphql}) => {
      const results = await queryArticles(graphql);
      if (results.errors) {
        results.errors.forEach(e => console.error(e.toString()));
        return Promise.reject(results.errors);
      }
      return results.data.allMarkdownRemark.edges.length;
    },
    firstPageSize: 11,
    nextPageSize: 12,
  });
  await createPaginatedPage({
    graphql,
    actions,
    queryPage: querySinglePage('all-results-page'),
    getEntriesLength: async ({graphql}) => {
      const results = await queryResults(graphql);
      if (results.errors) {
        results.errors.forEach(e => console.error(e.toString()));
        return Promise.reject(results.errors);
      }
      return results.data.allMarkdownRemark.edges.length;
    },
    firstPageSize: 11,
    nextPageSize: 12,
  });
  await createMultipleEntryPages({
    graphql,
    actions,
    queryPages: queryArticles,
    getContext: ({next, previous}) => ({
      next,
      previous,
    }),
  });
  await createMultipleEntryPages({
    graphql,
    actions,
    queryPages: queryResults,
    getContext: ({node, next, previous}) => ({
      next:
        next && next.frontmatter.category === node.frontmatter.category
          ? next
          : undefined,
      previous:
        previous && previous.frontmatter.category === node.frontmatter.category
          ? previous
          : undefined,
    }),
  });
  await createPaginatedPage({
    graphql,
    actions,
    queryPage: querySinglePage('all-videos-page'),
    getEntriesLength: async ({graphql}) => {
      const videoPage = await queryAllVideosPage('all-videos-page')(graphql);
      return videoPage.data.markdownRemark.frontmatter.videos.length;
    },
    pageSize: 6,
  });
};
