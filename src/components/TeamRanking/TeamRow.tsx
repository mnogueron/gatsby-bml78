import React from 'react';
import {Box, Flex, HStack, Text} from '@chakra-ui/react';
import ResultBadge from './ResultBadge';

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
  index: number;
};

const TeamRow = ({index}: TeamRowProps) => {
  return (
    <HStack width="100%">
      <HeaderCell>{index}</HeaderCell>

      <Box flex={1} p={2}>
        <Text color="text.secondary" fontSize="md">
          Équipe
        </Text>
      </Box>

      <ResultBadge score={10} />
      <ResultBadge score={3} variant="win" />
      <ResultBadge score={3} />
      <ResultBadge score={4} variant="loss" />
      <ResultBadge score={1} variant="win" />
      <ResultBadge score={-1} variant="loss" />
      <ResultBadge score={28} />
    </HStack>
  );
};

export default TeamRow;
