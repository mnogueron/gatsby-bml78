import React from 'react';
import {BoxProps, Flex, VStack} from '@chakra-ui/react';
import PlayerDetails from './PlayerDetails';
import PlayerTeamScoreRow from './PlayerTeamScoreRow';
import {PlayerInfo, TeamScores} from './types';

type TeamRowProps = {
  team: PlayerInfo[];
  score: TeamScores;
  scoreOpponent: TeamScores;
  isWinning: boolean;
  isRightAligned?: boolean;
  hideClub?: boolean;
} & BoxProps;

const TeamRow = ({
  team,
  score,
  scoreOpponent,
  isRightAligned,
  isWinning,
  hideClub,
  ...rest
}: TeamRowProps) => {
  return (
    <Flex
      flexDirection={{base: 'row', md: isRightAligned ? 'row-reverse' : 'row'}}
      justifyContent="space-between"
      flex={1}
      {...rest}
    >
      <VStack
        justifyContent="center"
        alignItems="initial"
        p={2}
        pl={{base: 0, md: 2}}
        ml={{base: 0, md: isRightAligned ? 2 : 0}}
        mr={{base: 2, md: isRightAligned ? 0 : 2}}
        bg={
          isWinning
            ? {
                base: `linear-gradient(to right, #FFFFFF, var(--chakra-colors-green-100))`,
                md: `linear-gradient(${
                  isRightAligned ? 'to left' : 'to right'
                }, #FFFFFF, var(--chakra-colors-green-100))`,
              }
            : undefined
        }
        flex={1}
        borderRadius={8}
      >
        {team.map((p, i) => (
          <PlayerDetails
            key={`player-${i}`}
            player={p}
            isRightAligned={isRightAligned}
            hideClub={hideClub}
          />
        ))}
      </VStack>
      <PlayerTeamScoreRow score={score} scoreOpponent={scoreOpponent} />
    </Flex>
  );
};

export default TeamRow;
