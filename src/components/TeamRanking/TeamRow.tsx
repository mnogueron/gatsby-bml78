import React from 'react';
import {Flex, HStack, Text} from '@chakra-ui/react';
import ResultBadge from '../ResultBadge';
import {TeamRankDetails} from './types';
import TeamName from '../TeamName';

type TeamRowProps = {
  details: TeamRankDetails;
  index: number;
  isFirst?: boolean;
  isLast?: boolean;
};

const TeamRow = ({details, index, isFirst, isLast}: TeamRowProps) => {
  return (
    <HStack
      width="100%"
      _hover={{bg: 'blackAlpha.100'}}
      borderRadius="md"
      spacing={{base: 1, md: 2}}
    >
      <Flex
        width={{base: '12px', sm: '26px', lg: '32px'}}
        justifyContent="center"
        alignItems="center"
      >
        <Text
          color="text.secondary"
          fontWeight="semibold"
          fontSize={{base: 'xs', md: 'md'}}
        >
          {index}
        </Text>
      </Flex>

      <Flex
        alignSelf="stretch"
        flex={1}
        px={{base: 1, sm: 2}}
        py={1}
        borderRightRadius="md"
        alignItems="center"
        bg={
          isFirst
            ? `linear-gradient(to right, rgba(255, 255, 255, 0), var(--chakra-colors-green-100))`
            : isLast
              ? `linear-gradient(to right, rgba(255, 255, 255, 0), var(--chakra-colors-red-100))`
              : undefined
        }
      >
        <TeamName
          team={details.team}
          textProps={{fontSize: {base: 'xs', md: 'md'}}}
        />
      </Flex>

      <ResultBadge score={details.playedDays} />
      <ResultBadge score={details.win} variant="win" />
      <ResultBadge score={details.equal} />
      <ResultBadge score={details.loss} variant="auto-reverse" />
      <ResultBadge
        score={details.retire}
        variant="auto-reverse"
        display={{base: 'none', sm: 'flex'}}
      />
      <ResultBadge score={details.penalties} variant="auto" />
      <ResultBadge score={details.points} />
    </HStack>
  );
};

export default TeamRow;
