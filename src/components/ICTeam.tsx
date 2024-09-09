import React from 'react';
import {Box, Flex, Link, Text} from '@chakra-ui/react';
import BMLHostTag from './TeamCalendar/BMLHostTag';
import {Link as GatsbyLink} from 'gatsby-link';
import {TeamMeetingDetails} from './TeamCalendar/types';

type ICTeamProps = {
  order: 'left' | 'right';
  team: TeamMeetingDetails;
  win?: boolean;
  isBMLHosting?: boolean;
};

type TeamNameProps = {
  team: TeamMeetingDetails;
  isRightAligned: boolean;
};

const TeamName = ({team, isRightAligned}: TeamNameProps) => {
  const content = (
    <>
      <Text
        fontSize={{base: 'xs', md: 'md'}}
        textAlign={{base: 'left', md: isRightAligned ? 'right' : 'left'}}
        display={{base: 'block', lg: 'none'}}
      >
        {team.shortName || team.longName}
      </Text>
      <Text
        fontSize="md"
        textAlign={{base: 'left', md: isRightAligned ? 'right' : 'left'}}
        display={{base: 'none', lg: 'block'}}
      >
        {team.longName || team.shortName}
      </Text>
    </>
  );

  return team.icBadTeamId ? (
    <Link
      as={GatsbyLink}
      href={`https://icbad.ffbad.org/equipe/${team.icBadTeamId}`}
      target="_blank"
      rel="noopener noreferrer"
      textDecoration="none"
      _hover={{
        textDecoration: 'underline',
      }}
    >
      {content}
    </Link>
  ) : (
    content
  );
};

const ICTeam = ({order, team, win, isBMLHosting}: ICTeamProps) => {
  const isRightAligned = order === 'right';
  return (
    <Flex
      alignSelf="stretch"
      flex={1}
      borderRightRadius={isRightAligned ? undefined : 'md'}
      borderLeftRadius={isRightAligned ? 'md' : undefined}
      alignItems="center"
      justifyContent="space-between"
      direction={isRightAligned ? 'row-reverse' : 'row'}
      px={{base: 1, sm: 2}}
      py={1}
      bg={
        win
          ? {
              base: `linear-gradient(to right, rgba(255, 255, 255, 0), var(--chakra-colors-green-100))`,
              md: `linear-gradient(${
                isRightAligned ? 'to left' : 'to right'
              }, rgba(255, 255, 255, 0), var(--chakra-colors-green-100))`,
            }
          : undefined
      }
    >
      <Box flex={1}>
        <TeamName team={team} isRightAligned={isRightAligned} />
      </Box>
      {isBMLHosting && <BMLHostTag />}
    </Flex>
  );
};

export default ICTeam;
