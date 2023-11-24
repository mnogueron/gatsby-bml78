import React, {useMemo} from 'react';
import {Flex, Text} from '@chakra-ui/react';

const RankingBadge = ({ranking}) => {
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
    <Flex
      width={8}
      height={8}
      backgroundColor={bgColor}
      justifyContent="center"
      alignItems="center"
      borderRadius={4}
      flexShrink={0}
    >
      <Text
        color={textColor}
        fontWeight="semibold"
        fontSize="md"
        letterSpacing="tight"
      >
        {ranking}
      </Text>
    </Flex>
  );
};

export default RankingBadge;
