import React, {useMemo} from 'react';
import {
  BoxProps,
  Button,
  Divider,
  Flex,
  Heading,
  VStack,
} from '@chakra-ui/react';
import {Meeting} from './types';
import TeamCalendarRow from './TeamCalendarRow';
import * as dateFns from 'date-fns';

type TeamCalendarProps = {
  calendar: Meeting[];
} & BoxProps;

const TeamCalendar = ({calendar, ...rest}: TeamCalendarProps) => {
  const {passedMeetings, futureMeetings} = useMemo(() => {
    return {
      passedMeetings: calendar.filter(m =>
        dateFns.isBefore(m.date, new Date())
      ),
      futureMeetings: calendar.filter(m => dateFns.isAfter(m.date, new Date())),
    };
  }, [calendar]);

  const handleSeeMorePassedMeetings = () => {
    /* noop */
  };

  return (
    <VStack
      borderRadius={8}
      p={4}
      bg="bg.main"
      boxShadow="md"
      alignItems="initial"
      spacing={6}
      {...rest}
    >
      <VStack spacing={2}>
        <VStack spacing={1} width="100%" py={2}>
          <Flex
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Heading fontSize="md">{'Rencontres passées'}</Heading>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSeeMorePassedMeetings}
            >
              {'Voir plus'}
            </Button>
          </Flex>
          <Divider />
        </VStack>
        {passedMeetings.map((m, index) => (
          <TeamCalendarRow key={index} meeting={m} />
        ))}
      </VStack>
      <VStack spacing={2}>
        <VStack spacing={1} width="100%" py={2}>
          <Flex
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Heading fontSize="md">{'Rencontres à venir'}</Heading>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSeeMorePassedMeetings}
            >
              {'Voir plus'}
            </Button>
          </Flex>
          <Divider />
        </VStack>
        {futureMeetings.map((m, index) => (
          <TeamCalendarRow key={index} meeting={m} isFuture={true} />
        ))}
      </VStack>
    </VStack>
  );
};

export default TeamCalendar;
