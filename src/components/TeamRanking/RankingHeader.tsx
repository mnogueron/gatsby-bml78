import React from 'react';
import {Box, Divider, Flex, HStack, Text, VStack} from '@chakra-ui/react';

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

const RankingHeader = () => {
  return (
    <VStack width="100%" spacing={1}>
      <HStack width="100%">
        <HeaderCell>#</HeaderCell>

        <Box flex={1} p={2}>
          <Text color="text.secondary" fontSize="md">
            Équipe
          </Text>
        </Box>

        <HeaderCell>J</HeaderCell>
        <HeaderCell>G</HeaderCell>
        <HeaderCell>N</HeaderCell>
        <HeaderCell>P</HeaderCell>
        <HeaderCell>B+</HeaderCell>
        <HeaderCell>P-</HeaderCell>
        <HeaderCell>P</HeaderCell>
      </HStack>
      <Divider height="1px" />
    </VStack>
  );
};

export default RankingHeader;
