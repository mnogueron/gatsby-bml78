export * from './articles.js';
export * from './results.js';
export * from './videos.js';

export const querySinglePage = templateKey => graphql =>
  graphql(
    `
      query loadPagesQuery($templateKey: String!) {
        markdownRemark(frontmatter: {templateKey: {eq: $templateKey}}) {
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            seo {
              title
              description
              image {
                childImageSharp {
                  fixed {
                    src
                  }
                }
              }
            }
          }
        }
      }
    `,
    {templateKey}
  );

export const queryAll = excludeTemplateKeys => graphql =>
  graphql(
    `
      query loadPagesQuery($nin: [String]!) {
        allMarkdownRemark(
          sort: {frontmatter: {date: DESC}}
          filter: {frontmatter: {templateKey: {nin: $nin}}}
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                seo {
                  title
                  description
                  image {
                    childImageSharp {
                      fixed {
                        src
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
    {nin: excludeTemplateKeys}
  );
