import React from 'react';
import {Heading, HStack, Icon, VStack} from '@chakra-ui/react';
import DateBadge from './DateBadge';
import {ParsedMeeting} from './types';
import ICTeam from '../ICTeam';
import ResultBadge from '../ResultBadge';
import {MdFlashOn} from 'react-icons/md';

type TeamCalendarRowProps = {
  meeting: ParsedMeeting;
  isFuture?: boolean;
};

const TeamCalendarRow = ({meeting, isFuture}: TeamCalendarRowProps) => {
  const {teamA, teamB, date} = meeting;
  if (!teamA || !teamB) {
    return null;
  }

  const scoreA = teamA.score;
  const scoreB = teamB.score;
  const teamAWin =
    typeof scoreA !== 'undefined' &&
    typeof scoreB !== 'undefined' &&
    scoreA > scoreB;
  const teamBWin =
    typeof scoreA !== 'undefined' &&
    typeof scoreB !== 'undefined' &&
    scoreB > scoreA;

  return (
    <HStack
      width="100%"
      _hover={{bg: 'blackAlpha.100'}}
      borderRadius="md"
      spacing={{base: 1, md: 2}}
    >
      <DateBadge
        date={date}
        {...(isFuture ? {bg: 'gray.600', color: 'white'} : {})}
      />

      <ICTeam
        order="left"
        team={teamA}
        win={teamAWin}
        isBMLHosting={teamA.shortName?.includes('BML') && teamA.isHost}
      />

      {isFuture ? (
        <VStack width="60px" spacing={0} height="38px">
          <Heading fontSize="sm" color="text.secondary">
            {'vs'}
          </Heading>
          <Icon as={MdFlashOn} boxSize={5} />
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

      <ICTeam
        order="right"
        team={meeting.teamB}
        win={teamBWin}
        isBMLHosting={teamB.shortName === 'BML' && teamB.isHost}
      />

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
