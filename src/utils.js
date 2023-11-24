export const preparePosts = posts => {
  return posts.map(p => ({...p.node.frontmatter, fields: p.node.fields}));
};
