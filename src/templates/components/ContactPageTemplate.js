import React from 'react';
import Header from '../../components/Header';
import {Heading, Text} from '@chakra-ui/react';
import {TextImageSplit} from '../../components/Sections';
import Content from '../../components/Content';
import ContactForm from '../../components/ContactForm';

function ContactPageTemplate({heading, subheading, contactform, body}) {
  return (
    <div>
      <Header heading={heading} subheading={subheading} />

      <TextImageSplit image={contactform.image} pb={'0 !important'}>
        <Heading
          as="h2"
          fontSize={{base: '2xl', sm: '3xl', lg: '4xl'}}
          fontWeight="semibold"
          color="text.main"
        >
          {contactform.heading}
        </Heading>
        <Text color="gray.500" mt={6} fontSize="lg" lineHeight="tall">
          {contactform.description}
        </Text>
        <ContactForm />
      </TextImageSplit>

      {body && (
        <Content
          html={body}
          pt={0}
          pb={{base: 4, md: 10, lg: 20}}
          as="article"
        />
      )}
    </div>
  );
}

export default ContactPageTemplate;
