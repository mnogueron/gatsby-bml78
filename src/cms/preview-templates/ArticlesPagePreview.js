import React from "react"
import ArticlesPageTemplate from "../../templates/ArticlesPageTemplate"

const ArticlesPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(["data"]).toJS()

  if (data) {
    return (
      <ArticlesPageTemplate
        heading={data.heading}
        subheading={data.subheading}
      />
    )
  } else {
    return <div>Loading...</div>
  }
}

export default ArticlesPagePreview