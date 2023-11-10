import React from 'react';
import { Container, Heading } from '@chakra-ui/react';
import { CardGrid } from '../../components/Sections';
import SeeMoreButton from './SeeMoreButton';

const LastResultsSection = ({ results }) => {
  return (
    <Container
      maxW="7xl"
      mt={{ base: 8, md: 12, lg: 16 }}
      pb={16}
      as="section"
    >
      <div className="flex justify-between items-baseline">
        <Heading as="h2" size="xl">
          Les derniers résultats du club
        </Heading>
        <SeeMoreButton display={{ base: 'none', md: 'flex' }} to="/results" />
      </div>
      <div className="mt-8">
        <CardGrid posts={results} subheading={'Résultats'} />
      </div>
      <SeeMoreButton
        display={{ base: 'flex', md: 'none' }}
        to="/results"
        variant="outline"
        my={4}
        mx="auto"
        maxW="2xs"
      />
    </Container>
  );
};

export default LastResultsSection;
