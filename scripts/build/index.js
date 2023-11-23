import {createBasePages} from './createBasePages.js';
import {createPosts} from './createPosts.js';
import {createICResults} from './createICResults.js';

export const createPages = async ({graphql, actions}) => {
  await createBasePages({graphql, actions});
  await createPosts({graphql, actions});
  await createICResults({graphql, actions});
};
