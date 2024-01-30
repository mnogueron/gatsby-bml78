import type {GatsbyNode} from 'gatsby';
import {createFilePath} from 'gatsby-source-filesystem';

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
}) => {
  // @ts-ignore
  const {createPages} = await import('./scripts/build/index.js');
  await createPages({graphql, actions});
};

export const onCreateNode: GatsbyNode['onCreateNode'] = ({
  node,
  getNode,
  actions,
}) => {
  const {createNodeField} = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({node, getNode, basePath: `pages`});
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] =
  ({actions}) => {
    const {createTypes} = actions;
    const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }

    type Frontmatter {
      president: Member
      secretary: Member
      treasurer: Member
      board: [Member]
    }
    
    type Member {
      name: String
      title: String
    }
  `;
    createTypes(typeDefs);
  };
