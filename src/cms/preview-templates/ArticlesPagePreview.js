import React from "react"
import ArticlesPageTemplate from "../../templates/components/ArticlesPageTemplate"

const ArticlesPagePreview = ({ data }) => {
  return (
    <ArticlesPageTemplate
      heading={data.heading}
      subheading={data.subheading}
    />
  )
}

export default ArticlesPagePreview