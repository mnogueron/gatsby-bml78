import React from 'react';
import {Flex, Text} from '@chakra-ui/react';

type ICTeamProps = {
  order: 'left' | 'right';
  team: {
    shortName?: string;
    longName: string;
  };
  win?: boolean;
};

const ICTeam = ({order, team, win}: ICTeamProps) => {
  const isRightAligned = order === 'right';
  return (
    <Flex
      alignSelf="stretch"
      flex={1}
      borderRightRadius={isRightAligned ? undefined : 'md'}
      borderLeftRadius={isRightAligned ? 'md' : undefined}
      alignItems="center"
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
      <Text
        fontSize="md"
        textAlign={{base: 'left', md: isRightAligned ? 'right' : 'left'}}
        display={{base: 'block', md: 'none'}}
        flex={1}
      >
        {team.shortName || team.longName}
      </Text>
      <Text
        fontSize="md"
        textAlign={{base: 'left', md: isRightAligned ? 'right' : 'left'}}
        display={{base: 'none', md: 'block'}}
        flex={1}
      >
        {team.longName || team.shortName}
      </Text>
    </Flex>
  );
};

export default ICTeam;
