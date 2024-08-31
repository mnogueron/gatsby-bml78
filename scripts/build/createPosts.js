import {getComponent} from './utils.js';
import {ALL_FEATHERS} from './feathers.js';

const query = graphql =>
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

export const createPosts = async ({graphql, actions}) => {
  const {createPage} = actions;

  const result = await query(graphql);

  if (result.errors) {
    result.errors.forEach(e => console.error(e.toString()));
    return Promise.reject(result.errors);
  }

  const {edges} = result.data.allMarkdownRemark;

  edges.forEach(({node, next, previous}) => {
    const {id, frontmatter, fields} = node;
    const {title, templateKey, seo} = frontmatter;

    if (!templateKey) {
      return;
    }

    createPage({
      path: fields.slug,
      component: getComponent(templateKey),
      // additional data can be passed via context
      context: {
        id,
        title,
        seo: {
          title: seo?.title || undefined,
          description: seo?.description || undefined,
          image: seo?.image?.childImageSharp?.fixed?.src || undefined,
        },
        templateKey,
        next,
        previous,
        feather: ALL_FEATHERS.find(f => f.location === fields.slug),
        hiddenCheck:
          process.env.NODE_ENV === 'development'
            ? [null, false, true]
            : [null, false],
      },
    });
  });
};
