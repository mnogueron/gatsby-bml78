const path = require("path")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          query {
            allMarkdownRemark(
              sort: { order: DESC, fields: [frontmatter___date] }
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
                next {
                  fields {
                    slug
                  }
                  frontmatter {
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
                    title
                    heading
                    templateKey
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          result.errors.forEach(e => console.error(e.toString()))
          return Promise.reject(result.errors)
        }

        const { edges } = result.data.allMarkdownRemark

        edges.forEach(({ node, next, previous }) => {
          const id = node.id
          const { title, templateKey } = node.frontmatter;

          if (!templateKey) {
            return;
          }

          const seo = {
            title: node.frontmatter.seo?.title || undefined,
            description: node.frontmatter.seo?.description || undefined,
            image: node.frontmatter.seo?.image?.childImageSharp?.fixed?.src || undefined,
          }
          createPage({
            path: node.fields.slug,
            // tags: edge.node.frontmatter.tags,
            component: path.resolve(
              `src/templates/${String(templateKey)}.js`
            ),
            // additional data can be passed via context
            context: {
              id,
              title,
              seo,
              templateKey,
              next,
              previous,
            },
          })
        })
      })
    )
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const {createTypes} = actions
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
  `
  createTypes(typeDefs)
}

