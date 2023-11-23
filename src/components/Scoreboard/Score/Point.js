import React from 'react';
import {Center, Text} from '@chakra-ui/react';

const Point = ({score, oppositeScore}) => {
  const isEmpty =
    typeof score === 'undefined' && typeof oppositeScore === 'undefined';
  const isWinning =
    !isEmpty &&
    ((score && typeof oppositeScore === 'undefined') || score > oppositeScore);
  return (
    <Center
      borderRadius={4}
      bg="blackAlpha.100"
      width={{base: '22px', sm: '26px', lg: '32px'}}
      height={{base: '28px', sm: '32px', lg: '38px'}}
    >
      <Text
        fontSize={{base: 'xs', sm: 'sm', lg: 'md'}}
        textColor={
          isEmpty || score === oppositeScore
            ? 'gray.500'
            : isWinning
              ? 'green.500'
              : 'red.500'
        }
        fontWeight={isWinning ? 'semibold' : 'normal'}
      >
        {typeof score === 'undefined' ? '-' : score}
      </Text>
    </Center>
  );
};

export default Point;
