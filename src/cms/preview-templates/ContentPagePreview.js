import React, {useEffect, useState} from "react"
import ContentPageTemplate from "../../templates/components/ContentPageTemplate"
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import {toHast} from 'mdast-util-to-hast'

const ContentPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(["data"]).toJS()
  const [html, setHtml] = useState(null);

  useEffect(() => {
    const prepareHTML = async () => {
      const preparedHTML = await unified()
        .use(remarkParse)
        .parse(data.body)
      setHtml(toHast(preparedHTML))
    }
    prepareHTML();
  }, [data.body])

  // need to get the image assets and put them in the team array
  /*const team = data.team.map(member => {
    const image = getAsset(member.image)
    return {
      ...member,
      image,
    }
  })*/

  // render markdown for cms preview
  //const html = marked(data.body)

  if (data) {
    return (
      <ContentPageTemplate
        heading={data.heading}
        subheading={data.subheading}
        html={html}
        /*team={team}*/
      />
    )
  } else {
    return <div>Loading...</div>
  }
}

export default ContentPagePreview
