import React from 'react';
import { Box, Heading, Text, Container } from '@chakra-ui/react';

// A simple header without an image
function Header({ heading, subheading }) {
  return (
    <Box
      as="header"
      backgroundColor="blue.700"
      marginTop={{ base: '48px', sm: 68 }}
      py={{ base: 12, sm: 16, md: 20, lg: 24 }}
    >
      <Container maxW="7xl" textAlign="center">
        <Heading
          as="h1"
          fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
          color="white"
        >
          {heading}
        </Heading>
        {subheading && (
          <Text fontSize={'xl'} color={'gray.100'} mt={6}>
            {subheading}
          </Text>
        )}
      </Container>
    </Box>
  );
}

// A different header for the project page
export function ProjectHeader({ heading, location, date }) {
  return (
    <Box
      as="header"
      backgroundColor="blue.700"
      marginTop={{ base: '48px', sm: 68 }}
      py={{ base: 24, sm: 28, md: 32, lg: 36 }}
      pb={{ base: 24, sm: 32 }}
    >
      <Container maxW="7xl" textAlign="center">
        <Text
          fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
          color={'gray.100'}
          mt={6}
        >
          {location} &bull; {date}
        </Text>
        <Heading
          as="h1"
          fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
          color="white"
          mt={2}
        >
          {heading}
        </Heading>
      </Container>
    </Box>
  );
}

export default Header;
