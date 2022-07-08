import React from "react"
import ContactPageTemplate from "../../templates/components/ContactPageTemplate"
import useProcessedHAST from "../useProcessedHAST";
const marked = require("marked")

const ContactPagePreview = ({ data, getAsset }) => {
  const html = useProcessedHAST(data.body);
  // get image assets and transform markdown
  const contactform = {
    ...data.contactform,
    image: getAsset(data.contactform.image),
  }

  const office = {
    ...data.office,
    image: getAsset(data.office.image),
    address: {
      html: marked(data.office.address),
    },
    phone: { html: marked(data.office.phone) },
  }

  return (
    <ContactPageTemplate
      heading={data.heading}
      subheading={data.subheading}
      contactform={contactform}
      office={office}
      body={html}
    />
  )
}

export default ContactPagePreview
