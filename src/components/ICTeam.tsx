import React from 'react';
import {Box, Flex, Text} from '@chakra-ui/react';
import BMLHostTag from './TeamCalendar/BMLHostTag';

type ICTeamProps = {
  order: 'left' | 'right';
  team: {
    shortName?: string;
    longName: string;
  };
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
      px={2}
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
        <Text
          fontSize="md"
          textAlign={{base: 'left', md: isRightAligned ? 'right' : 'left'}}
          display={{base: 'block', md: 'none'}}
        >
          {team.shortName || team.longName}
        </Text>
        <Text
          fontSize="md"
          textAlign={{base: 'left', md: isRightAligned ? 'right' : 'left'}}
          display={{base: 'none', md: 'block'}}
        >
          {team.longName || team.shortName}
        </Text>
      </Box>
      {isBMLHosting && <BMLHostTag />}
    </Flex>
  );
};

export default ICTeam;
