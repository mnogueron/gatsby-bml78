import React, {useMemo} from 'react';
import {Box, BoxProps, Text} from '@chakra-ui/react';
import {Rank} from '../types';

type SmallRankBadgeProps = {
  rank: Rank;
} & BoxProps;

const SmallRankBadge = ({rank, ...rest}: SmallRankBadgeProps) => {
  const bgColor = useMemo(() => {
    switch (rank) {
      case Rank.NC:
        return 'gray.400';
      case Rank.P12:
      case Rank.P11:
      case Rank.P10:
        return '#f8e71c';
      case Rank.D9:
      case Rank.D8:
      case Rank.D7:
        return '#7ed321';
      case Rank.R6:
      case Rank.R5:
      case Rank.R4:
        return '#4a90e2';
      case Rank.N3:
      case Rank.N2:
      case Rank.N1:
        return '#f80220';
      default:
        return 'white';
    }
  }, [rank]);

  return (
    <Box width="26px" {...rest}>
      <Box position="relative" width="fit-content" marginLeft="auto">
        <Text fontSize={{base: 'sm', md: 'md'}} letterSpacing="tight">
          {rank}
        </Text>
        <Box
          height="3px"
          width="100%"
          bg={bgColor}
          sx={{position: 'absolute'}}
          bottom="-1px"
        />
      </Box>
    </Box>
  );
};

export default SmallRankBadge;
