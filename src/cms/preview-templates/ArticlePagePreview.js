import React from "react"
import ArticlePageTemplate from "../../templates/components/ArticlePageTemplate"
const marked = require("marked")

const ArticlePagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(["data"]).toJS()

  if (data) {

    // get image assets and transform markdown
    const image =
      data.featuredimage && data.featuredimage.image
        ? {
            ...data.featuredimage,
            image: getAsset(data.featuredimage.image),
          }
        : { image: null, alt: "" }

    const body = data.body ? marked(data.body) : null

    return (
      <ArticlePageTemplate
        location={data.location}
        title={data.title}
        date={new Date(data.date).toLocaleDateString("en-GB", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
        image={image}
        body={body}
      />
    )
  } else {
    return <div>Loading...</div>
  }
}

export default ArticlePagePreview
