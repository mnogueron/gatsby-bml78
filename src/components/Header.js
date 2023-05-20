import React from 'react';
import {Box, Heading, Text, Container, VStack} from '@chakra-ui/react';
import format from 'date-fns/format';
import frLocale from 'date-fns/locale/fr';

// A simple header without an image
function Header({ heading, subheading }) {
  return (
    <Box
      as="header"
      pt={{ base: 12, sm: 16, md: 20, lg: 28 }}
      pb={{ base: 8, sm: 12, md: 16, lg: 16 }}
    >
      <VStack maxW="7xl" textAlign="center" margin="auto" spacing={{ base: 3, md: 6}}>
        <Heading
          as="h1"
          fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}
          color="text.main"
        >
          {heading}
        </Heading>
        {subheading && (
          <Heading as="h2" fontSize={'lg'} color={'text.secondary'}>
            {subheading}
          </Heading>
        )}
      </VStack>
    </Box>
  );
}

// A different header for the project page
export function ArticleHeader({ heading, subheading, date }) {
  return (
    <Box
      as="header"
      //backgroundColor="blue.700"
      pt={{ base: 8, sm: 12, md: 20, lg: 28 }}
      pb={{ base: 6, sm: 10, md: 16, lg: 16 }}
    >
      <Container
        display="flex"
        maxW={'7xl'}
        textAlign="center"
        alignItems="center"
        flexDirection={{ base: 'column-reverse', md: 'column' }}
        px={8}
      >
        {date && (
          <Text
            fontSize={{ base: 'sm', sm: 'md', md: 'lg', lg: 'xl' }}
            color={'gray.500'}
            mt={4}
          >
            Publié le {format(new Date(date), 'PPP', { locale: frLocale })}
          </Text>
        )}
        <Box>
          <Heading
            as="h1"
            fontSize={{ base: '2xl', sm: '3xl', md: '3xl', lg: '4xl' }}
            color="text.main"
            mt={4}
            maxW={'2xl'}
            whiteSpace="pre-wrap"
          >
            {heading}
          </Heading>
          {subheading && (
            <Text fontSize={'xl'} color={'gray.700'} mt={6}>
              {subheading}
            </Text>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default Header;
