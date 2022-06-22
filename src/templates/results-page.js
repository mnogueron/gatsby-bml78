import React from "react"
import {graphql, useStaticQuery} from "gatsby"
import MyHelmet from "../components/MyHelmet"
import ArticlesPageTemplate from "./components/ArticlesPageTemplate"

const ResultsPage = ({ data }) => {
  const { frontmatter: fm } = data.markdownRemark;
  const { edges: posts } = data.allMarkdownRemark

  return (
    <>
    <MyHelmet title={fm.title} description={fm.subheading} />
      <ArticlesPageTemplate
        heading={fm.heading}
        subheading={fm.subheading}
        posts={posts}
      />
    </>
  )
}

export default ResultsPage

export const resultsPageQuery = graphql`
    query ResultsPage($id: String!, $title: String!) {
        markdownRemark(id: { eq: $id }) {
            html
            frontmatter {
                title
                heading
                subheading
            }
        }
        allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { templateKey: { eq: "result-page" }, category: { eq: $title } } }
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
                        category
                        date(formatString: "MMMM DD, YYYY")
                        location
                        featuredimage {
                            alt
                            image {
                                childImageSharp {
                                    gatsbyImageData(
                                        width: 640
                                        placeholder: BLURRED
                                        aspectRatio: 1.5
                                        transformOptions: { fit: COVER, cropFocus: CENTER }
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

