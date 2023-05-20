import React, { useMemo } from 'react';
import { Box, Text } from '@chakra-ui/react';

const SmallRankingBadge = ({ ranking }) => {
  const textColor = useMemo(() => {
    switch (ranking) {
      case 'NC':
        return 'white';
      case 'P12':
      case 'P11':
      case 'P10':
        return 'black';
      case 'D9':
      case 'D8':
      case 'D7':
        return 'black';
      case 'R6':
      case 'R5':
      case 'R4':
        return 'white';
      case 'N3':
      case 'N2':
      case 'N1':
        return 'white';
      default:
        return 'black';
    }
  }, [ranking]);

  const bgColor = useMemo(() => {
    switch (ranking) {
      case 'NC':
        return 'gray.400';
      case 'P12':
      case 'P11':
      case 'P10':
        return '#f8e71c';
      case 'D9':
      case 'D8':
      case 'D7':
        return '#7ed321';
      case 'R6':
      case 'R5':
      case 'R4':
        return '#4a90e2';
      case 'N3':
      case 'N2':
      case 'N1':
        return '#f80220';
      default:
        return 'white';
    }
  }, [ranking]);

  return (
    <Box width="26px">
      <Box position="relative" width="fit-content" marginLeft="auto">
        <Text fontSize={{ base: 'sm', md: 'md' }} letterSpacing="tight">
          {ranking}
        </Text>
        <Box
          height="3px"
          width="100%"
          bg={bgColor}
          sx={{ position: 'absolute' }}
          bottom="-1px"
        />
      </Box>
    </Box>
  );
};

export default SmallRankingBadge;
