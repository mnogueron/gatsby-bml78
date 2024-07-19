import React from 'react';
import {Heading, HStack, Icon, VStack} from '@chakra-ui/react';
import DateBadge from './DateBadge';
import {Meeting} from './types';
import ICTeam from '../ICTeam';
import ResultBadge from '../ResultBadge';
import {MdFlashOn} from 'react-icons/md';

type TeamCalendarRowProps = {
  meeting: Meeting;
  isFuture?: boolean;
};

const TeamCalendarRow = ({meeting, isFuture}: TeamCalendarRowProps) => {
  const scoreA = meeting.teamA.score;
  const scoreB = meeting.teamB.score;
  const teamAWin =
    typeof scoreA !== 'undefined' &&
    typeof scoreB !== 'undefined' &&
    scoreA > scoreB;
  const teamBWin =
    typeof scoreA !== 'undefined' &&
    typeof scoreB !== 'undefined' &&
    scoreB > scoreA;
  return (
    <HStack width="100%" _hover={{bg: 'blackAlpha.100'}} borderRadius="md">
      <DateBadge date={meeting.date} />

      <ICTeam order="left" team={meeting.teamA} win={teamAWin} />

      {isFuture ? (
        <VStack width="72px" spacing={0}>
          <Heading fontSize="md" color="text.secondary">
            {'vs'}
          </Heading>
          <Icon as={MdFlashOn} boxSize={6} />
        </VStack>
      ) : (
        <>
          <ResultBadge
            score={scoreA}
            variant={teamAWin ? 'win' : teamBWin ? 'loss' : undefined}
          />
          <ResultBadge
            score={scoreB}
            variant={teamBWin ? 'win' : teamAWin ? 'loss' : undefined}
          />
        </>
      )}

      <ICTeam order="right" team={meeting.teamB} win={teamBWin} />

      {/*<Flex
        alignSelf="stretch"
        flex={1}
        px={2}
        py={1}
        borderRightRadius="md"
        alignItems="center"
      >
        <Text color="text.secondary" fontSize="md">
          {meeting.teamA}
        </Text>
      </Flex>

      <Flex
        alignSelf="stretch"
        flex={1}
        px={2}
        py={1}
        borderRightRadius="md"
        alignItems="center"
      >
        <Text color="text.secondary" fontSize="md">
          {meeting.teamB}
        </Text>
      </Flex>*/}
    </HStack>
  );
};

export default TeamCalendarRow;
