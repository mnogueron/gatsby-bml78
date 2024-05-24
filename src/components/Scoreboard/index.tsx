import React from 'react';
import {VStack} from '@chakra-ui/react';
import GameScoreboard from './GameScoreboard';
import {Match} from './types';

type ScoreboardProps = {
  matches: Match[];
};

const Scoreboard = ({matches}: ScoreboardProps) => {
  if (!matches) {
    return null;
  }

  return (
    <VStack
      alignItems="initial"
      spacing={{base: 2, md: 4}}
      paddingLeft={{base: 2, md: 0}}
    >
      {matches.map((match, index) => (
        <GameScoreboard key={`match-${index}`} match={match} />
      ))}
    </VStack>
  );
};

export default Scoreboard;
