import {createBasePage} from './utils.js';

const getTotalPages = (totalEntries, firstPageSize, nextPageSize) => {
  if (totalEntries <= firstPageSize) {
    return 1;
  }

  return Math.ceil((totalEntries - firstPageSize) / nextPageSize) + 1;
};

const getLimit = (currentPage, firstPageSize, nextPageSize) =>
  currentPage > 1 ? nextPageSize : firstPageSize;

const getSkip = (page, firstPageSize, nextPageSize) => {
  if (page > 1) {
    return (page - 2) * nextPageSize + firstPageSize;
  }
  return 0;
};

export const createPaginatedPage = async ({
  graphql,
  actions: {createPage},
  queryPage,
  getEntriesLength,
  ...options
}) => {
  const {pageSize} = options;
  const firstPageSize = options.firstPageSize || pageSize;
  const nextPageSize = options.nextPageSize || pageSize;

  const pageResult = await queryPage(graphql);

  if (pageResult.errors) {
    pageResult.errors.forEach(e => console.error(e.toString()));
    return Promise.reject(pageResult.errors);
  }

  const numPages = getTotalPages(
    await getEntriesLength({graphql}),
    firstPageSize,
    nextPageSize
  );

  createBasePage({
    edge: {node: pageResult.data.markdownRemark},
    createPage,
    getContext: () => ({
      limit: getLimit(1, firstPageSize, nextPageSize),
      skip: getSkip(1, firstPageSize, nextPageSize),
      numPages,
      currentPage: 1,
    }),
  });

  Array.from({length: numPages}).forEach((_, i) => {
    const page = i + 1;

    createBasePage({
      edge: {node: pageResult.data.markdownRemark},
      createPage,
      getPath: edge => `${edge.node.fields.slug}${page}`,
      getContext: () => ({
        limit: getLimit(page, firstPageSize, nextPageSize),
        skip: getSkip(page, firstPageSize, nextPageSize),
        numPages,
        currentPage: page,
      }),
    });
  });
};
