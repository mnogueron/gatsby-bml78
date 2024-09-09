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
      .sort((a, b) => dateFns.compareDesc(a.date, b.date));
    const now = new Date();
    return {
      passedMeetings: sortedCalendar.filter(m => dateFns.isBefore(m.date, now)),
      futureMeetings: sortedCalendar
        .filter(m => dateFns.isAfter(m.date, now))
        .sort((a, b) => dateFns.compareAsc(a.date, b.date)),
    };
  }, [calendar]);

  const {slicedPassedMeetings, slicedFutureMeetings} = useMemo(() => {
    return {
      /*slicedPassedMeetings: passedMeetings.slice(
        -((passedPageNumber + 1) * PASSED_PAGE_SIZE)
      ),
      slicedFutureMeetings: futureMeetings.slice(
        0,
        (futurePageNumber + 1) * FUTURE_PAGE_SIZE
      ),*/

      slicedPassedMeetings: passedMeetings.slice(
        0,
        (passedPageNumber + 1) * PASSED_PAGE_SIZE
      ),
      /*slicedFutureMeetings: futureMeetings.slice(
        -((futurePageNumber + 1) * FUTURE_PAGE_SIZE)
      ),*/
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
      p={{base: 2, md: 4}}
      bg="bg.main"
      boxShadow="md"
      alignItems="initial"
      spacing={{base: 1, md: 6}}
      {...rest}
    >
      {futureMeetings.length > 0 && (
        <VStack spacing={{base: 1, md: 2}}>
          <VStack spacing={1} width="100%" py={2} alignItems="initial">
            <Heading fontSize="md">{'Rencontres à venir'}</Heading>
            <Divider />
          </VStack>
          {slicedFutureMeetings.map((m, index) => (
            <TeamCalendarRow key={index} meeting={m} isFuture={true} />
          ))}
          {canSeeMoreFuture && (
            <Flex justifyContent="flex-end" width="100%" mt={{base: 1, md: 2}}>
              <Button
                variant="outline"
                size={{base: 'xs', md: 'sm'}}
                onClick={handleSeeMoreFutureMeetings}
              >
                {'Voir plus'}
              </Button>
            </Flex>
          )}
        </VStack>
      )}
      {passedMeetings.length > 0 && (
        <VStack spacing={{base: 1, md: 2}}>
          <VStack spacing={1} width="100%" py={2} alignItems="initial">
            <Heading fontSize="md" color="text.secondary">
              {'Rencontres passées'}
            </Heading>
            <Divider />
          </VStack>
          {slicedPassedMeetings.map((m, index) => (
            <TeamCalendarRow key={index} meeting={m} />
          ))}
          {canSeeMorePassed && (
            <Flex justifyContent="flex-end" width="100%" mt={{base: 1, md: 2}}>
              <Button
                variant="outline"
                size={{base: 'xs', md: 'sm'}}
                onClick={handleSeeMorePassedMeetings}
              >
                {'Voir plus'}
              </Button>
            </Flex>
          )}
        </VStack>
      )}
    </VStack>
  );
};

export default TeamCalendar;
