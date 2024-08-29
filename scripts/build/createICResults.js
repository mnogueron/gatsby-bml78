import {getComponent} from './utils.js';
import {ALL_FEATHERS} from './feathers.js';

const query = graphql =>
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

export const createICResults = async ({graphql, actions}) => {
  const {createPage} = actions;

  const result = await query(graphql);

  if (result.errors) {
    result.errors.forEach(e => console.error(e.toString()));
    return Promise.reject(result.errors);
  }

  const {edges} = result.data.allMarkdownRemark;

  edges.forEach(({node, next, previous}) => {
    const {id, frontmatter, fields} = node;
    const {title, templateKey, seo, category} = frontmatter;

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
        next: next && next.frontmatter.category === category ? next : undefined,
        previous:
          previous && previous.frontmatter.category === category
            ? previous
            : undefined,
        feather: ALL_FEATHERS.find(f => f.location === fields.slug),
      },
    });
  });
};
