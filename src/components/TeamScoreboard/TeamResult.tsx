import React from 'react';
import {Box, Heading, Stack} from '@chakra-ui/react';
import TeamScore from './TeamScore';
import {TeamResultInfo} from './types';

type TeamResultProps = {
  team: TeamResultInfo;
  opponentScore: number;
  isRightAligned?: boolean;
};

const TeamResult = ({team, isRightAligned, opponentScore}: TeamResultProps) => {
  const isWinning = team.result > opponentScore;
  return (
    <Stack
      direction={{base: 'row', md: isRightAligned ? 'row-reverse' : 'row'}}
      flex={1}
      justifyContent="space-between"
      alignItems="center"
    >
      <Box
        flex={1}
        borderRadius={8}
        pe={2}
        ps={{base: 0, md: isRightAligned ? 2 : 0}}
        py={2}
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
      >
        <Heading
          as="h3"
          fontSize={{base: 'md', sm: 'lg', md: 'xl'}}
          textAlign={{base: 'left', md: isRightAligned ? 'right' : 'left'}}
          display={{base: 'block', md: 'none'}}
        >
          {team.shortName || team.longName}
        </Heading>
        <Heading
          as="h3"
          fontSize={{base: 'md', sm: 'lg', md: 'xl'}}
          textAlign={{base: 'left', md: isRightAligned ? 'right' : 'left'}}
          display={{base: 'none', md: 'block'}}
        >
          {team.longName || team.shortName}
        </Heading>
      </Box>
      <TeamScore score={team.result} opponentScore={opponentScore} />
    </Stack>
  );
};

export default TeamResult;
