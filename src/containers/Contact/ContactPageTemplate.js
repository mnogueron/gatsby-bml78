import React from 'react';
import Header from '../../components/Header';
import {
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  Container as ChakraContainer,
} from '@chakra-ui/react';
import LegacyContainer from '../../components/LegacyContainer';
import Content from '../../components/Content';
import ContactForm from './components/ContactForm';
import Image from '../../components/Image';

function ContactPageTemplate({heading, subheading, contactform, body}) {
  return (
    <div>
      <Header heading={heading} subheading={subheading} />

      <LegacyContainer pb={'0 !important'}>
        <Stack
          direction={{base: 'column', lg: 'row'}}
          gap={{base: 0, lg: 10}}
          alignItems="center"
        >
          <Box w={{base: 'full', lg: '50%'}} pt={8} pb={12}>
            <ChakraContainer
              maxW={{base: 'lg', lg: '7xl'}}
              textAlign={{base: 'center', lg: 'left'}}
              p={0}
            >
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
            </ChakraContainer>
          </Box>

          <Flex
            w={{base: 'full', lg: '50%'}}
            justifyContent="center"
            alignItems="center"
          >
            <Image
              image={contactform.image.image || contactform.image}
              alt={contactform.image.alt || ''}
              borderRadius="md"
              h="full"
              w="full"
              objectFit="cover"
            />
          </Flex>
        </Stack>
      </LegacyContainer>

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
