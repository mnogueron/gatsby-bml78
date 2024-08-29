import React from 'react';
import {Box, Text, Container, Heading, VStack, Stack} from '@chakra-ui/react';
import Image from '../../components/Image';
import {TypeAnimation} from 'react-type-animation';

const FeatherChaseIntroMessage = () => {
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
            <TypeAnimation
              sequence={[
                `À trop jouer au badminton, notre mascotte a perdu ses plumes... Elles ont pris la poudre d'escampette et se sont envolées au quatres coins du site.... Au total, 4 plumes brisées en 4 morceaux sur 16 pages différentes. Bonne chasse !`,
              ]}
              wrapper="span"
              speed={60}
              cursor={false}
            />
          </Text>
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
