import React from 'react';
import {
  Box,
  BoxProps,
  Divider,
  Flex,
  Heading,
  HStack,
  VStack,
} from '@chakra-ui/react';

const HeaderCell = ({
  children,
  ...rest
}: {children: React.ReactNode} & BoxProps) => {
  return (
    <Flex
      width={{base: '22px', sm: '26px', lg: '32px'}}
      justifyContent="center"
      alignItems="center"
      {...rest}
    >
      <Heading color="text.secondary" fontSize={{base: 'sm', md: 'md'}}>
        {children}
      </Heading>
    </Flex>
  );
};

const RankingHeader = () => {
  return (
    <VStack width="100%" spacing={{base: 1, md: 2}}>
      <HStack width="100%" spacing={{base: 1, md: 2}}>
        <HeaderCell width={{base: '12px', sm: '26px', lg: '32px'}}>
          #
        </HeaderCell>

        <Box flex={1} p={2}>
          <Heading color="text.secondary" fontSize={{base: 'sm', md: 'md'}}>
            Équipe
          </Heading>
        </Box>

        <HeaderCell>J</HeaderCell>
        <HeaderCell>G</HeaderCell>
        <HeaderCell>N</HeaderCell>
        <HeaderCell>P</HeaderCell>
        <HeaderCell display={{base: 'none', sm: 'flex'}}>F</HeaderCell>
        <HeaderCell>B+</HeaderCell>
        <HeaderCell>P-</HeaderCell>
        <HeaderCell>P</HeaderCell>
      </HStack>
      <Divider height="1px" />
    </VStack>
  );
};

export default RankingHeader;
