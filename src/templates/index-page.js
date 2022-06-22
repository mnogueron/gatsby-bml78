import React from "react"
import { graphql } from "gatsby"
import MyHelmet from "../components/MyHelmet"

import IndexPageTemplate from "./components/IndexPageTemplate"

const IndexPage = ({ data }) => {
  const { frontmatter: fm } = data.markdownRemark

  // latest posts and results
  const { edges: posts } = data.allPostsMarkdownRemark
  const { edges: results } = data.allResultsMarkdownRemark

  return (
    <>
      <MyHelmet
        title={fm.title}
        description={fm.subheading}
      />
      <IndexPageTemplate
        heading={fm.heading}
        subheading={fm.subheading}
        image={fm.image}
        posts={posts}
        results={results}
        about={fm.about}
      />
    </>
  )
}

export default IndexPage

export const indexPageQuery = graphql`
  query IndexPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        image {
          childImageSharp {
            gatsbyImageData(width: 1024, placeholder: BLURRED)
          }
        }
        heading
        subheading
        about {
          description
          heading
          image {
            alt
            image {
              childImageSharp {
                gatsbyImageData(width: 1024, placeholder: BLURRED)
              }
            }
          }
          button {
            label
            url
          }
        }
      }
    }
    allPostsMarkdownRemark: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        frontmatter: {
          templateKey: { eq: "article-page" }
        }
      }
      limit: 3
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date
            location
            featuredimage {
              alt
              image {
                childImageSharp {
                  gatsbyImageData(
                    width: 640
                    placeholder: BLURRED
                    aspectRatio: 1.5
                  )
                }
              }
            }
          }
        }
      }
    }
    allResultsMarkdownRemark: allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: {
            frontmatter: {
                templateKey: { eq: "result-page" }
            }
        }
        limit: 3
    ) {
        edges {
            node {
                excerpt(pruneLength: 400)
                id
                fields {
                    slug
                }
                frontmatter {
                    title
                    templateKey
                    date
                    location
                    featuredimage {
                        alt
                        image {
                            childImageSharp {
                                gatsbyImageData(
                                    width: 640
                                    placeholder: BLURRED
                                    aspectRatio: 1.5
                                )
                            }
                        }
                    }
                }
            }
        }
    }
  }
`
