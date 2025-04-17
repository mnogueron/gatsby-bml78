import React, {useMemo} from 'react';
import {BoxProps, Flex, Text} from '@chakra-ui/react';
import {Rank} from '../types';

type MediumRankBadgeProps = {
  rank: Rank;
} & BoxProps;

const MediumRankBadge = ({rank, ...rest}: MediumRankBadgeProps) => {
  const {bgColor, textColor} = useMemo(() => {
    switch (rank) {
      case Rank.NC:
        return {bgColor: 'gray.400', textColor: 'white'};
      case Rank.P12:
      case Rank.P11:
      case Rank.P10:
        return {bgColor: '#f8e71c', textColor: 'black'};
      case Rank.D9:
      case Rank.D8:
      case Rank.D7:
        return {bgColor: '#7ed321', textColor: 'black'};
      case Rank.R6:
      case Rank.R5:
      case Rank.R4:
        return {bgColor: '#4a90e2', textColor: 'white'};
      case Rank.N3:
      case Rank.N2:
      case Rank.N1:
        return {bgColor: '#f80220', textColor: 'white'};
      default:
        return {bgColor: 'white', textColor: 'black'};
    }
  }, [rank]);

  return (
    <Flex
      width={8}
      height={8}
      backgroundColor={bgColor}
      justifyContent="center"
      alignItems="center"
      borderRadius={4}
      flexShrink={0}
      {...rest}
    >
      <Text
        color={textColor}
        fontWeight="semibold"
        fontSize="md"
        letterSpacing="tight"
        as="span"
      >
        {rank}
      </Text>
    </Flex>
  );
};

export default MediumRankBadge;
