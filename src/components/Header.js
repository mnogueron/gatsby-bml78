import React from 'react';
import {Box, Heading, Container, VStack, Stack} from '@chakra-ui/react';
import format from 'date-fns/format';
import frLocale from 'date-fns/locale/fr';

function Header({heading, subheading}) {
  return (
    <Box
      as="header"
      pt={{base: 12, sm: 16, md: 20, lg: 20}}
      pb={{base: 8, sm: 12, md: 16, lg: 16}}
    >
      <VStack
        maxW="7xl"
        textAlign="center"
        margin="auto"
        spacing={{base: 3, md: 6}}
      >
        <Heading
          as="h1"
          fontSize={{base: '2xl', sm: '3xl', md: '4xl', lg: '5xl'}}
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
export function ArticleHeader({heading, subheading, date}) {
  return (
    <Box
      as="header"
      pt={{base: 8, sm: 12, md: 20, lg: 20}}
      pb={{base: 6, sm: 8, md: 16, lg: 16}}
    >
      <Container
        as={Stack}
        display="flex"
        maxW={'7xl'}
        textAlign="center"
        alignItems="center"
        direction={{base: 'column-reverse', md: 'column'}}
        spacing={{base: 2, md: 4}}
        px={8}
      >
        {date && (
          <Heading
            as="h2"
            fontSize={{base: 'md', sm: 'lg', md: 'xl', lg: 'xl'}}
            color={'text.secondary'}
          >
            Publié le {format(new Date(date), 'PPP', {locale: frLocale})}
          </Heading>
        )}

        <VStack spacing={{base: 2, md: 4}}>
          <Heading
            as="h1"
            fontSize={{base: '2xl', sm: '3xl', md: '3xl', lg: '4xl'}}
            color="text.main"
            maxW={'2xl'}
            whiteSpace="pre-wrap"
          >
            {heading}
          </Heading>
          {subheading && (
            <Heading
              as="h2"
              fontSize={{base: 'md', sm: 'lg', md: 'xl', lg: 'xl'}}
              color={'text.secondary'}
            >
              {subheading}
            </Heading>
          )}
        </VStack>
      </Container>
    </Box>
  );
}

export default Header;
