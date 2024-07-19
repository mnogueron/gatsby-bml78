import React from 'react';
import {BoxProps, VStack} from '@chakra-ui/react';
import RankingHeader from './RankingHeader';
import TeamRow from './TeamRow';
import {TeamRankDetails} from './types';

type TeamRankingProps = {
  teams: TeamRankDetails[];
} & BoxProps;

const TeamRanking = ({teams, ...rest}: TeamRankingProps) => {
  return (
    <VStack borderRadius={8} p={4} bg="bg.main" boxShadow="md" {...rest}>
      <RankingHeader />
      {teams.map((t, index) => (
        <TeamRow
          key={t.id}
          index={index + 1}
          isFirst={index === 0}
          details={t}
          isLast={index === teams.length - 1}
        />
      ))}
    </VStack>
  );
};

export default TeamRanking;
