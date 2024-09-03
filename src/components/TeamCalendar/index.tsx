import React, {useMemo, useState} from 'react';
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
  calendar?: Meeting[];
} & BoxProps;

const PASSED_PAGE_SIZE = 3;
const FUTURE_PAGE_SIZE = 2;

const TeamCalendar = ({calendar = [], ...rest}: TeamCalendarProps) => {
  const [passedPageNumber, setPassedPageNumber] = useState(0);
  const [futurePageNumber, setFuturePageNumber] = useState(0);
  const {passedMeetings, futureMeetings} = useMemo(() => {
    const sortedCalendar = calendar
      .map(a => ({...a, date: new Date(a.date)}))
      .sort((a, b) => dateFns.compareAsc(a.date, b.date));
    const now = new Date();
    return {
      passedMeetings: sortedCalendar.filter(m => dateFns.isBefore(m.date, now)),
      futureMeetings: sortedCalendar.filter(m => dateFns.isAfter(m.date, now)),
    };
  }, [calendar]);

  const {slicedPassedMeetings, slicedFutureMeetings} = useMemo(() => {
    return {
      slicedPassedMeetings: passedMeetings.slice(
        -((passedPageNumber + 1) * PASSED_PAGE_SIZE)
      ),
      slicedFutureMeetings: futureMeetings.slice(
        0,
        (futurePageNumber + 1) * FUTURE_PAGE_SIZE
      ),
    };
  }, [futureMeetings, futurePageNumber, passedMeetings, passedPageNumber]);

  const canSeeMorePassed =
    (passedPageNumber + 1) * PASSED_PAGE_SIZE < passedMeetings.length;
  const canSeeMoreFuture =
    (futurePageNumber + 1) * FUTURE_PAGE_SIZE < futureMeetings.length;

  const handleSeeMorePassedMeetings = () => {
    setPassedPageNumber(prev => prev + 1);
  };

  const handleSeeMoreFutureMeetings = () => {
    setFuturePageNumber(prev => prev + 1);
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
      {passedMeetings.length > 0 && (
        <VStack spacing={2}>
          <VStack spacing={1} width="100%" py={2}>
            <Flex
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Heading fontSize="md">{'Rencontres passées'}</Heading>
              {canSeeMorePassed && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSeeMorePassedMeetings}
                >
                  {'Voir plus'}
                </Button>
              )}
            </Flex>
            <Divider />
          </VStack>
          {slicedPassedMeetings.map((m, index) => (
            <TeamCalendarRow key={index} meeting={m} />
          ))}
        </VStack>
      )}
      {futureMeetings.length > 0 && (
        <VStack spacing={2}>
          <VStack spacing={1} width="100%" py={2}>
            <Flex
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Heading fontSize="md">{'Rencontres à venir'}</Heading>
              {canSeeMoreFuture && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSeeMoreFutureMeetings}
                >
                  {'Voir plus'}
                </Button>
              )}
            </Flex>
            <Divider />
          </VStack>
          {slicedFutureMeetings.map((m, index) => (
            <TeamCalendarRow key={index} meeting={m} isFuture={true} />
          ))}
        </VStack>
      )}
    </VStack>
  );
};

export default TeamCalendar;
