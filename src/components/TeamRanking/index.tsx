import React from 'react';
import {BoxProps, VStack} from '@chakra-ui/react';
import RankingHeader from './RankingHeader';
import TeamRow from './TeamRow';

type TeamRankingProps = BoxProps;

const TeamRanking = ({...rest}: TeamRankingProps) => {
  return (
    <VStack borderRadius={8} p={4} bg="bg.main" boxShadow="md" {...rest}>
      <RankingHeader />
      <TeamRow index={1} />
      <TeamRow index={2} />
      <TeamRow index={3} />
      <TeamRow index={4} />
    </VStack>
  );
};

export default TeamRanking;
