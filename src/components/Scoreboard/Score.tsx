import React from 'react';
import {BoxProps, Center, Text} from '@chakra-ui/react';
import {SetScore} from './types';

type ScoreProps = {
  score: SetScore;
  opponentScore: SetScore;
} & BoxProps;

const Score = ({score, opponentScore, ...rest}: ScoreProps) => {
  const isEmpty =
    typeof score === 'undefined' && typeof opponentScore === 'undefined';
  const isWinning =
    !isEmpty &&
    ((score && typeof opponentScore === 'undefined') ||
      (score ?? -1) > (opponentScore ?? -1));
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
          isEmpty || score === opponentScore
            ? 'gray.500'
            : isWinning
              ? 'green.500'
              : 'red.500'
        }
        fontWeight={isWinning ? 'semibold' : 'normal'}
      >
        {score ?? '-'}
      </Text>
    </Center>
  );
};

export default Score;
