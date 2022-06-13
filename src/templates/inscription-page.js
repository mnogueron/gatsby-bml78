import React from "react"
import { graphql } from "gatsby"
import MyHelmet from "../components/MyHelmet"
import AboutPageTemplate from "./AboutPageTemplate"

const InscriptionPage = ({ data }) => {
  const { markdownRemark: post } = data
  const { frontmatter: fm } = post

  return (
    <>
      <MyHelmet title={fm.title} description={fm.subheading} />
      <AboutPageTemplate
        heading={fm.heading}
        subheading={fm.subheading}
        html={post.html}
        team={fm.team}
      />
    </>
  )
}

export default InscriptionPage

export const inscriptionPageQuery = graphql`
  query InscriptionPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        heading
        subheading
      }
    }
  }
`
