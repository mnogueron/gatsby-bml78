import React from 'react';
import {Flex, HStack, Text} from '@chakra-ui/react';
import ResultBadge from '../ResultBadge';
import {TeamRankDetails} from './types';

const HeaderCell = ({children}: {children: React.ReactNode}) => {
  return (
    <Flex
      width={{base: '22px', sm: '26px', lg: '32px'}}
      justifyContent="center"
      alignItems="center"
    >
      <Text color="text.secondary" fontSize="md">
        {children}
      </Text>
    </Flex>
  );
};

type TeamRowProps = {
  details: TeamRankDetails;
  index: number;
  isFirst?: boolean;
  isLast?: boolean;
};

const TeamRow = ({details, index, isFirst, isLast}: TeamRowProps) => {
  return (
    <HStack width="100%" _hover={{bg: 'blackAlpha.100'}} borderRadius="md">
      <HeaderCell>{index}</HeaderCell>

      <Flex
        alignSelf="stretch"
        flex={1}
        px={2}
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
        <Text color="text.secondary" fontSize="md">
          {details.name}
        </Text>
      </Flex>

      <ResultBadge score={details.playedDays} />
      <ResultBadge score={details.win} variant="win" />
      <ResultBadge score={details.equal} />
      <ResultBadge score={details.loss} variant="loss" />
      <ResultBadge score={details.bonus} variant="win" />
      <ResultBadge score={details.malus} variant="loss" />
      <ResultBadge score={details.points} />
    </HStack>
  );
};

export default TeamRow;
