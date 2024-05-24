import React from 'react';
import {Stack, useBreakpointValue} from '@chakra-ui/react';
import Score from './Score';
import {SetScore} from './types';

type PlayerTeamScoreRowProps = {
  score: [SetScore, SetScore, SetScore];
  scoreOpponent: [SetScore, SetScore, SetScore];
};

const PlayerTeamScoreRow = ({
  score,
  scoreOpponent,
}: PlayerTeamScoreRowProps) => {
  const isMobile = useBreakpointValue({base: true, md: false});
  return (
    <Stack
      direction={{base: 'row', md: 'column'}}
      alignItems="center"
      justifyContent="center"
      spacing={{base: 1, md: 2}}
    >
      <Score score={score[0]} opponentScore={scoreOpponent[0]} />
      <Score score={score[1]} opponentScore={scoreOpponent[1]} />
      {(isMobile ||
        typeof score[2] !== 'undefined' ||
        typeof scoreOpponent[2] !== 'undefined') && (
        <Score score={score[2]} opponentScore={scoreOpponent[2]} />
      )}
    </Stack>
  );
};

export default PlayerTeamScoreRow;
