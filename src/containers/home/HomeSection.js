import { Container, Heading } from '@chakra-ui/react';
import SeeMoreButton from './SeeMoreButton';
import React from 'react';

const HomeSection = ({ title, moreButtonRedirectTo, children, ...rest }) => {
  return (
    <Container
      maxW="7xl"
      mt={{ base: 8, md: 12, lg: 16 }}
      as="section"
      {...rest}
    >
      <div className="flex justify-between items-baseline">
        <Heading as="h2" size="xl">
          {title}
        </Heading>
        {moreButtonRedirectTo && (
          <SeeMoreButton
            display={{ base: 'none', md: 'flex' }}
            to={moreButtonRedirectTo}
          />
        )}
      </div>
      <div className="mt-8">{children}</div>
      {moreButtonRedirectTo && (
        <SeeMoreButton
          display={{ base: 'flex', md: 'none' }}
          to={moreButtonRedirectTo}
          variant="outline"
          my={4}
          mx="auto"
          maxW="2xs"
        />
      )}
    </Container>
  );
};

export default HomeSection;
