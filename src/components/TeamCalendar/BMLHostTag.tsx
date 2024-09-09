import React from 'react';
import {Box, Text} from '@chakra-ui/react';

const BMLHostTag = () => {
  return (
    <Box p={1} bg="red.500" borderRadius="lg">
      <Text
        color="white"
        fontSize={{base: 'xs', md: 'sm'}}
        lineHeight="shorter"
        display={{base: 'none', md: 'block'}}
      >
        {'Domicile'}
      </Text>
      <Text
        color="white"
        fontSize={{base: 'xs', md: 'sm'}}
        lineHeight="shorter"
        display={{base: 'block', md: 'none'}}
      >
        {'Dom'}
      </Text>
    </Box>
  );
};

export default BMLHostTag;
