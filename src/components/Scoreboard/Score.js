import React from 'react';
import {Box, Divider, HStack, Text} from '@chakra-ui/react';

const Score = ({score, oppositeScore}) => {
  return (
    <HStack height={'100%'}>
      <Box flex={1} textAlign={'center'}>
        <Text
          color={oppositeScore[0] < score[0] ? 'green.500' : 'black'}
          fontWeight={oppositeScore[0] < score[0] ? 'bold' : 'normal'}
        >
          {score[0] || '-'}
        </Text>
      </Box>
      <Divider orientation="vertical" />
      <Box flex={1} textAlign={'center'}>
        <Text
          color={oppositeScore[1] < score[1] ? 'green.500' : 'black'}
          fontWeight={oppositeScore[1] < score[1] ? 'bold' : 'normal'}
        >
          {score[1] || '-'}
        </Text>
      </Box>
      <Divider orientation="vertical" />
      <Box flex={1} textAlign={'center'}>
        <Text
          color={oppositeScore[2] < score[2] ? 'green.500' : 'black'}
          fontWeight={oppositeScore[2] < score[2] ? 'bold' : 'normal'}
        >
          {score[2] || '-'}
        </Text>
      </Box>
    </HStack>
  );
};

export default Score;
