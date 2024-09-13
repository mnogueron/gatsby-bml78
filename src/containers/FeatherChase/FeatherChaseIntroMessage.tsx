import React from 'react';
import {
  Box,
  Text,
  Container,
  Heading,
  VStack,
  Stack,
  Flex,
  HStack,
} from '@chakra-ui/react';
import Image from '../../components/Image';
import {useFeatherChaseContext} from './FeatherChaseProvider';

const FeatherChaseIntroMessage = () => {
  const {playerId, caughtFeathers, totalFeather} = useFeatherChaseContext();
  return (
    <Container maxW="5xl" mt={{base: 8, md: 12, lg: 16}} as="section">
      <Stack
        position="relative"
        direction={{base: 'column', md: 'row'}}
        alignItems={{base: 'flex-end', md: 'flex-start'}}
        spacing={{base: 1, md: 2}}
      >
        <VStack
          p={4}
          bg="blackAlpha.800"
          borderRadius="md"
          spacing={3}
          alignItems="initial"
          flex={1}
          sx={{
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              clipPath: {
                base: 'polygon(0 0, 75% 0, 100% 100%)',
                md: 'polygon(0 0, 100% 100%, 0 75%)',
              },
              top: {base: 'calc(100% - 2px)', md: '1rem'},
              right: {base: '128px', sm: '192px', md: 'initial'},
              left: {base: 'initial', md: 'calc(100% - 2px)'},
              bg: 'blackAlpha.800',
              height: {base: '1.5rem', md: 'calc(1.5rem / 2 * 3)'},
              width: {base: 'calc(1.5rem / 2 * 3)', md: '1.rem'},
            },
          }}
        >
          <Heading
            as="h3"
            color="text.inverted.main"
            fontSize={{base: 'lg', sm: 'xl', md: '2xl'}}
            fontFamily={'VT323, monospace'}
          >
            {`Notre mascotte a perdu ses plumes, sauras-tu les retrouver ?`}
          </Heading>
          <Text
            color="text.inverted.main"
            fontSize={{base: 'lg', sm: 'xl'}}
            fontFamily={'VT323, monospace'}
            lineHeight="short"
          >
            {`À trop jouer au badminton, notre mascotte a perdu ses plumes... Elles ont pris la poudre d'escampette et se sont envolées aux quatres coins du site... Un coup de raquette les a brisées et se sont réparties sur 16 pages différentes. Bonne chasse !`}
          </Text>
          <Flex justifyContent="space-between">
            <HStack spacing="2px" justifyContent="center">
              <Text
                color="text.inverted.main"
                fontSize={'sm'}
                fontFamily={'VT323, monospace'}
                lineHeight="short"
              >
                {`${caughtFeathers.length} / ${totalFeather}`}
              </Text>
              <Box
                as={Image}
                image={{
                  url: `/assets/featherChase/plume_1.svg`,
                }}
                alt=""
                height="18px"
              />
            </HStack>
            <Text
              color="text.inverted.main"
              fontSize={'sm'}
              fontFamily={'VT323, monospace'}
              lineHeight="short"
            >
              {`ID : #${playerId}`}
            </Text>
          </Flex>
        </VStack>
        <Box
          as={Image}
          image={{url: '/assets/featherChase/4_feathers_missing.svg'}}
          alt=""
          width={{base: '128px', sm: '192px', md: '256px'}}
        />
      </Stack>
    </Container>
  );
};

export default FeatherChaseIntroMessage;
