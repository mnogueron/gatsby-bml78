import React from 'react';
import {Tag, Box, Text} from '@chakra-ui/react';

const BMLHostTag = () => {
  return (
    <Box p={1} bg="red.500" borderRadius="lg">
      <Text color="white" fontSize="sm" lineHeight="shorter">
        {'Domicile'}
      </Text>
    </Box>
  );
};

export default BMLHostTag;
