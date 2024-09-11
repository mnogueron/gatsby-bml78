import React from 'react';
import {Box, Flex} from '@chakra-ui/react';
import BMLHostTag from './TeamCalendar/BMLHostTag';
import {TeamMeetingDetails} from './TeamCalendar/types';
import TeamName from './TeamName';

type ICTeamProps = {
  order: 'left' | 'right';
  team: TeamMeetingDetails;
  win?: boolean;
  isBMLHosting?: boolean;
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
        <TeamName
          team={team}
          textProps={{
            fontSize: {base: 'xs', md: 'md'},
            textAlign: {base: 'left', md: isRightAligned ? 'right' : 'left'},
          }}
        />
      </Box>
      {isBMLHosting && <BMLHostTag />}
    </Flex>
  );
};

export default ICTeam;
