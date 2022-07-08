import React from 'react'
import Header from "../../components/Header"
import { TextImageSplit, SectionHeading } from "../../components/Sections"
import Content from "../../components/Content";
import ContactForm from "../../components/ContactForm";

function ContactPageTemplate({
  heading,
  subheading,
  contactform,
  office,
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

      {/*<TextImageSplit image={office.image} imageLeft={true}>
        <p className="text-green-700 font-semibold tracking-wide">
          {office.tagline}
        </p>
        <SectionHeading>{office.location}</SectionHeading>
        <div className="mt-6 sm:flex sm:flex-row text-gray-500">
          <div
            className="sm:w-1/2"
            dangerouslySetInnerHTML={{ __html: office.address.html }}
          />
          <div
            className="mt-6 sm:mt-0 sm:w-1/2"
            dangerouslySetInnerHTML={{ __html: office.phone.html }}
          />
        </div>
      </TextImageSplit>*/}
    </div>
  )
}

export default ContactPageTemplate
