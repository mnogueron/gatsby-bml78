import React from 'react';
import {Center, Text} from '@chakra-ui/react';

type TeamScoreProps = {
  score: number | undefined;
  opponentScore: number | undefined;
};

const TeamScore = ({score, opponentScore}: TeamScoreProps) => {
  const isWinning = (score ?? -1) > (opponentScore ?? -1);

  return (
    <Center
      borderRadius={4}
      bg="blackAlpha.100"
      width={{base: '26px', lg: '32px'}}
      height={{base: '32px', lg: '38px'}}
    >
      <Text
        fontSize={{base: 'md', lg: 'lg'}}
        textColor={
          score === opponentScore
            ? 'gray.500'
            : isWinning
              ? 'green.500'
              : 'red.500'
        }
        fontWeight={isWinning ? 'bold' : 'normal'}
      >
        {score ?? '-'}
      </Text>
    </Center>
  );
};

export default TeamScore;
