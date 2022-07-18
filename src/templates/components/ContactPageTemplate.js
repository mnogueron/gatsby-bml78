import React from 'react'
import Header from "../../components/Header"
import { TextImageSplit, SectionHeading } from "../../components/Sections"
import Content from "../../components/Content";
import ContactForm from "../../components/ContactForm";

function ContactPageTemplate({
  heading,
  subheading,
  contactform,
  body,
}) {
  return (
    <div>
      <Header heading={heading} subheading={subheading} />

      <TextImageSplit image={contactform.image} pb={'0 !important'}>
        <SectionHeading>{contactform.heading}</SectionHeading>
        <p className="mt-6 text-gray-500 text-lg">
          {contactform.description}
        </p>
        <ContactForm />
      </TextImageSplit>

      {body && <Content html={body} pt={0} pb={{ base: 4, md: 10, lg: 20 }}/>}
    </div>
  )
}

export default ContactPageTemplate
