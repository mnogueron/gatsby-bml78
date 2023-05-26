const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPages } = await import('./scripts/build/index.js');
  await createPages({graphql, actions});
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }

    type Frontmatter {
      office: Office
      president: Member
      secretary: Member
      treasurer: Member
      board: [Member]
    }
    
    type Member {
      name: String
      title: String
    }

    type Office {
      address: String @md
      phone: String @md
    }
  `;
  createTypes(typeDefs);
};
