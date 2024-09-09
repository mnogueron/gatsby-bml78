import React, {useMemo} from 'react';
import {BoxProps, Center, Text} from '@chakra-ui/react';

type ResultBadgeProps = {
  score: number | undefined;
  variant?: 'win' | 'loss' | 'auto' | 'auto-reverse';
} & BoxProps;

const ResultBadge = ({score, variant, ...rest}: ResultBadgeProps) => {
  const textColor = useMemo(() => {
    if (!variant) {
      return 'gray.500';
    }

    if (typeof score === 'undefined') {
      return 'gray.500';
    }

    if (variant === 'win') {
      return 'green.500';
    }

    if (variant === 'loss') {
      return 'red.500';
    }

    if (variant === 'auto') {
      return score > 0 ? 'green.500' : score < 0 ? 'red.500' : 'gray.500';
    }

    if (variant === 'auto-reverse') {
      return score > 0 ? 'red.500' : score < 0 ? 'green.500' : 'gray.500';
    }
  }, [score, variant]);

  const fontWeight = useMemo(() => {
    if (typeof score === 'undefined') {
      return 'normal';
    }

    return variant === 'win' && score > 0 ? 'semibold' : 'normal';
  }, [score, variant]);

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
        textColor={textColor}
        fontWeight={fontWeight}
      >
        {score ?? '-'}
      </Text>
    </Center>
  );
};

export default ResultBadge;
