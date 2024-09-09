import React from 'react';
import {Flex, HStack, Text, Link} from '@chakra-ui/react';
import ResultBadge from '../ResultBadge';
import {TeamRankDetails} from './types';
import {Link as GatsbyLink} from 'gatsby';

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
        <Link
          as={GatsbyLink}
          href={`https://icbad.ffbad.org/equipe/${details.team.icBadTeamId}`}
          target="_blank"
          rel="noopener noreferrer"
          textDecoration="none"
          _hover={{
            textDecoration: 'underline',
          }}
        >
          <Text
            color="text.secondary"
            fontSize="xs"
            display={{base: 'block', md: 'none'}}
          >
            {details.team.shortName || details.team.longName}
          </Text>
          <Text
            color="text.secondary"
            fontSize="md"
            display={{base: 'none', md: 'block'}}
          >
            {details.team.longName || details.team.shortName}
          </Text>
        </Link>
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
