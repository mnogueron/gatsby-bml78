import React from 'react';
import {Box, Divider, Heading, Stack, VStack} from '@chakra-ui/react';
import TeamResult from './TeamResult';
import {TeamResultInfo} from './types';

type TeamScoreboardProps = {
  teamScore: {
    teamA: TeamResultInfo;
    teamB: TeamResultInfo;
  };
};

const TeamScoreboard = ({teamScore}: TeamScoreboardProps) => {
  const {teamA, teamB} = teamScore || {};

  if (!teamA || !teamB) {
    return null;
  }

  return (
    <Box paddingLeft={{base: 2, md: 0}} mb={{base: 4, md: 6}}>
      <VStack
        padding={4}
        paddingStart={{base: 4, md: 12}}
        backgroundColor="white"
        borderRadius={8}
        boxShadow="md"
        alignItems="initial"
        spacing={{base: 2, md: 4}}
      >
        <Heading
          as="h2"
          fontSize={{base: 'md', md: 'lg'}}
          textAlign="center"
          mt={{base: 0, md: 1}}
        >
          {"Résultat d'équipe"}
        </Heading>
        <Divider />
        <Stack direction={{base: 'column', md: 'row'}}>
          <TeamResult team={teamA} opponentScore={teamB.result} />
          <TeamResult
            team={teamB}
            opponentScore={teamA.result}
            isRightAligned={true}
          />
        </Stack>
      </VStack>
    </Box>
  );
};

export default TeamScoreboard;
