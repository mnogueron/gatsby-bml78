export const queryResults = graphql =>
  graphql(`
    {
      allMarkdownRemark(
        sort: [{frontmatter: {category: DESC}}, {frontmatter: {date: DESC}}]
        filter: {frontmatter: {templateKey: {eq: "result-page"}}}
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
              category
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
          next {
            fields {
              slug
            }
            frontmatter {
              cardTitle
              title
              heading
              templateKey
              category
            }
          }
          previous {
            fields {
              slug
            }
            frontmatter {
              cardTitle
              title
              heading
              templateKey
              category
            }
          }
        }
      }
    }
  `);
