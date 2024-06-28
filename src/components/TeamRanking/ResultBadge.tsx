import React from 'react';
import {BoxProps, Center, Text} from '@chakra-ui/react';

type ResultBadgeProps = {
  score: number | undefined;
  variant?: 'win' | 'loss';
} & BoxProps;

const ResultBadge = ({score, variant, ...rest}: ResultBadgeProps) => {
  const isEmpty = typeof score === 'undefined';
  return (
    <Center
      borderRadius={4}
      bg="blackAlpha.100"
      width={{base: '22px', sm: '26px', lg: '32px'}}
      height={{base: '28px', sm: '32px', lg: '38px'}}
      {...rest}
    >
      <Text
        fontSize={{base: 'xs', sm: 'sm', lg: 'md'}}
        textColor={
          isEmpty || !variant
            ? 'gray.500'
            : variant === 'win'
              ? 'green.500'
              : 'red.500'
        }
        fontWeight={variant === 'win' ? 'semibold' : 'normal'}
      >
        {score ?? '-'}
      </Text>
    </Center>
  );
};

export default ResultBadge;
