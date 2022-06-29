import React from "react"
import AboutPageTemplate from "../../templates/components/AboutPageTemplate"
import useProcessedHAST from "../useProcessedHAST";

const AboutPagePreview = ({ data, entry, getAsset }) => {
  // need to get the image assets and put them in the team array
  const team = data.team.map(member => {
    const image = getAsset(member.image)
    return {
      ...member,
      image,
    }
  })

  const html = useProcessedHAST(data.body);

  return (
    <AboutPageTemplate
      heading={data.heading}
      subheading={data.subheading}
      html={html}
      team={team}
    />
  )
}

export default AboutPagePreview
