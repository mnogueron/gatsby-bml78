import React, { useMemo } from 'react';
import {
  Box,
  Center,
  Divider,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  Text,
  VStack,
  HStack,
} from '@chakra-ui/react';

const RankingBadge = ({ ranking }) => {
  const textColor = useMemo(() => {
    switch (ranking) {
      case 'NC':
        return 'white';
      case 'P12':
      case 'P11':
      case 'P10':
        return 'black';
      case 'D9':
      case 'D8':
      case 'D7':
        return 'black';
      case 'R6':
      case 'R5':
      case 'R4':
        return 'white';
      case 'N3':
      case 'N2':
      case 'N1':
        return 'white';
    }
    return 'black';
  }, [ranking]);

  const bgColor = useMemo(() => {
    switch (ranking) {
      case 'NC':
        return 'gray.400';
      case 'P12':
      case 'P11':
      case 'P10':
        return '#f8e71c';
      case 'D9':
      case 'D8':
      case 'D7':
        return '#7ed321';
      case 'R6':
      case 'R5':
      case 'R4':
        return '#4a90e2';
      case 'N3':
      case 'N2':
      case 'N1':
        return '#f80220';
    }
    return 'gray';
  }, [ranking]);

  return (
    <Flex
      width={8}
      height={8}
      backgroundColor={bgColor}
      justifyContent="center"
      alignItems="center"
    >
      <Text color={textColor} fontWeight="bold" letterSpacing="tight">
        {ranking}
      </Text>
    </Flex>
  );
};

const Score = ({ score, oppositeScore }) => {
  return (
    <HStack height={'100%'}>
      <Box flex={1} textAlign={'center'}>
        <Text
          color={oppositeScore[0] < score[0] ? 'green.500' : 'black'}
          fontWeight={oppositeScore[0] < score[0] ? 'bold' : 'normal'}
        >
          {score[0] || '-'}
        </Text>
      </Box>
      <Divider orientation="vertical" />
      <Box flex={1} textAlign={'center'}>
        <Text
          color={oppositeScore[1] < score[1] ? 'green.500' : 'black'}
          fontWeight={oppositeScore[1] < score[1] ? 'bold' : 'normal'}
        >
          {score[1] || '-'}
        </Text>
      </Box>
      <Divider orientation="vertical" />
      <Box flex={1} textAlign={'center'}>
        <Text
          color={oppositeScore[2] < score[2] ? 'green.500' : 'black'}
          fontWeight={oppositeScore[2] < score[2] ? 'bold' : 'normal'}
        >
          {score[2] || '-'}
        </Text>
      </Box>
    </HStack>
  );
};

const Scoreboard = ({ matches, hideHeader }) => {
  if (!matches) {
    return null;
  }

  return (
    <TableContainer my={10} mx={{base: 0, md: 4 }}>
      <Table size="sm">
        {!hideHeader && (
          <Thead>
            <Tr borderBottomWidth={3}>
              <Th width={'100px'}>Club</Th>
              <Th width={'150px'} textAlign="center">
                Classement
              </Th>
              <Th>Name</Th>
              <Th textAlign="center">Score</Th>
            </Tr>
          </Thead>
        )}
        <Tbody>
          {matches.map((match, index) => {
            const { teamA = [], teamB = [], score = [] } = match;
            const normalisedScore = [
              [
                score.set[0]?.scoreA,
                score.set[1]?.scoreA,
                score.set[2]?.scoreA,
              ],
              [
                score.set[0]?.scoreB,
                score.set[1]?.scoreB,
                score.set[2]?.scoreB,
              ],
            ];
            return (
              <React.Fragment key={`match-${index}`}>
                <Tr>
                  <Td width={'100px'} height={'1px'}>
                    <VStack
                      alignItems={'flex-start'}
                      height={'100%'}
                      justifyContent="center"
                    >
                      {teamA.map((p) => (
                        <Flex
                          key={`${p.lastname}-${p.firstname}-${p.club}`}
                          alignItems={'center'}
                          flex={1}
                        >
                          {p.club}
                        </Flex>
                      ))}
                    </VStack>
                  </Td>
                  <Td width={'150px'} height={'1px'}>
                    <VStack justifyContent="center" height={'100%'}>
                      {teamA.map((p) => (
                        <Flex
                          key={`${p.lastname}-${p.firstname}-${p.ranking}`}
                          alignItems={'center'}
                          flex={1}
                        >
                          <RankingBadge ranking={p.ranking} />
                        </Flex>
                      ))}
                    </VStack>
                  </Td>
                  <Td height={'1px'}>
                    <VStack
                      alignItems={'flex-start'}
                      height={'100%'}
                      justifyContent="center"
                    >
                      {teamA.map((p) => (
                        <Flex
                          key={`${p.lastname}-${p.firstname}`}
                          alignItems={'center'}
                          flex={1}
                        >
                          <Text
                            as="span"
                            fontWeight={'bold'}
                            marginRight={1}
                            textTransform="uppercase"
                          >
                            {p.lastname}
                          </Text>
                          {p.firstname}
                        </Flex>
                      ))}
                    </VStack>
                  </Td>
                  <Td height={'1px'}>
                    <Score
                      score={normalisedScore[0]}
                      oppositeScore={normalisedScore[1]}
                    />
                  </Td>
                </Tr>
                <Tr
                  borderBottomWidth={`${
                    index < matches.length - 1 ? 4 : 1
                  }px !important`}
                >
                  <Td width={'100px'} height={'1px'}>
                    <VStack
                      alignItems={'flex-start'}
                      height={'100%'}
                      justifyContent="center"
                    >
                      {teamB.map((p) => (
                        <Flex
                          key={`${p.lastname}-${p.firstname}-${p.club}`}
                          alignItems={'center'}
                          flex={1}
                        >
                          {p.club}
                        </Flex>
                      ))}
                    </VStack>
                  </Td>
                  <Td width={'150px'} height={'1px'}>
                    <VStack justifyContent="center" height={'100%'}>
                      {teamB.map((p) => (
                        <Flex
                          key={`${p.lastname}-${p.firstname}-${p.ranking}`}
                          alignItems={'center'}
                          flex={1}
                        >
                          <RankingBadge ranking={p.ranking} />
                        </Flex>
                      ))}
                    </VStack>
                  </Td>
                  <Td height={'1px'}>
                    <VStack
                      alignItems={'flex-start'}
                      height={'100%'}
                      justifyContent="center"
                    >
                      {teamB.map((p) => (
                        <Flex
                          key={`${p.lastname}-${p.firstname}`}
                          alignItems={'center'}
                          flex={1}
                        >
                          <Text
                            as="span"
                            fontWeight={'bold'}
                            marginRight={1}
                            textTransform="uppercase"
                          >
                            {p.lastname}
                          </Text>
                          {p.firstname}
                        </Flex>
                      ))}
                    </VStack>
                  </Td>
                  <Td height={'1px'}>
                    <Score
                      score={normalisedScore[1]}
                      oppositeScore={normalisedScore[0]}
                    />
                  </Td>
                </Tr>
              </React.Fragment>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default Scoreboard;
