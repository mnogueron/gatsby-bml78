export const queryArticles = graphql =>
  graphql(
    `
      query loadPagesQuery($hiddenCheck: [Boolean]!) {
        allMarkdownRemark(
          sort: {frontmatter: {date: DESC}}
          filter: {
            frontmatter: {
              templateKey: {eq: "article-page"}
              hidden: {in: $hiddenCheck}
            }
          }
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
                hidden
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
              }
            }
          }
        }
      }
    `,
    {
      hiddenCheck:
        process.env.NODE_ENV === 'development'
          ? [null, false, true]
          : [null, false],
    }
  );
