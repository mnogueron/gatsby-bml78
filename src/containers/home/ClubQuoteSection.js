import React from 'react';
import {Box} from '@chakra-ui/react';
import ClubQuote from './ClubQuote';
import HomeSection from './HomeSection';

const ClubQuoteSection = ({content}) => {
  return (
    <HomeSection title="Le club">
      <Box px={{base: 6, md: 16}} py={{base: 0, md: 2, lg: 4}}>
        <ClubQuote content={content} />
      </Box>
    </HomeSection>
  );
};

export default ClubQuoteSection;
