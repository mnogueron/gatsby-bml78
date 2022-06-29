import React from 'react';
import { Link } from 'gatsby';
import {
  Button,
  Container,
  Box,
  VStack,
  Heading,
  Text,
  Icon, Flex,
} from '@chakra-ui/react';
import { MdChevronRight } from 'react-icons/md';
import { CardSet } from '../../components/Sections';
import Image from '../../components/Image';

const SeeMoreButton = ({ to, ...rest }) => {
  return (
    <Button
      variant="ghost"
      as={Link}
      to={to}
      rightIcon={<Icon as={MdChevronRight} boxSize={8} />}
      {...rest}
    >
      Voir plus
    </Button>
  );
};

const IndexPageTemplate = ({
  heading,
  subheading,
  headerImage,
  image,
  posts = [],
  results = [],
  about,
}) => {
  return (
    <div>
      {/* Header */}
      <Box
        backgroundColor={'blue.700'}
        position="relative"
      >
        <Container
          maxW="7xl"
          py={16}
          minHeight={{ base: 'calc(100vh - 48px)', sm: '700px' }}
          display="flex"
          alignItems="center"
        >
          <Box
            height={'100%'}
            width={'100%'}
            position={'absolute'}
            bottom={0}
            right={0}
            left={0}
            top={0}
          >
            <Box
              as={Image}
              /*image={{url: 'https://static.actu.fr/uploads/2018/06/25435-180625142930290-0-960x640.jpg'}}*/
              image={headerImage}
              alt=""
              sx={{
                objectFit: 'cover',
                filter: 'blur(var(--chakra-blur-sm)) grayscale(50%) brightness(0.5)',
                /*transform: 'scaleX(-1)',*/
                height: { base: '100%', sm: '100%' },
                width: { base: '100%', sm: '100%' },
                '& > div': {
                  height: { base: '100%', sm: '100%' },
                  width: { base: '100%', sm: '100%' },
                },
              }}
            />
          </Box>

          <Flex
            h="100%"
            flexDirection="column"
            justifyContent="center"
            alignItems={{ base: 'center', sm: 'center' }}
            textAlign={{ base: 'center', sm: 'center' }}
            flex={1}
            zIndex={100}
          >
            <Heading
              size="4xl"
              color={'gray.100'}
              maxW={{ base: '100%', sm: '70%' }}
              mb={5}
            >
              {heading}
            </Heading>
            <Text
              fontSize="2xl"
              color={'gray.200'}
              maxW={{ base: '100%', sm: '70%' }}
              mb={10}
            >
              {subheading}
            </Text>
            <Button
              colorScheme="blue"
              size="lg"
              as={Link}
              to="/infos-pratiques/inscription"
            >
              Rejoindre le club
            </Button>
          </Flex>
        </Container>

        <Box
          display={{ base: 'none', md: 'block' }}
          maxHeight={{ base: '80%', sm: '80%' }}
          width={{ base: '10%', sm: '20%' }}
          position={'absolute'}
          bottom={0}
          left={0}
        >
          <Box
            as={Image}
            image={image}
            alt=""
            sx={{
              transform: 'scaleX(-1)',
              filter: 'brightness(0.9)',

              height: '40vw',
              maxHeight: '500px',
              '& > div': {
                height: { base: '100%', sm: '100%' },
              },
            }}
          />
        </Box>
      </Box>

      {/*<div className="relative bg-green-700 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pt-24 pb-12 bg-green-700 sm:pt-28 sm:pb-14 md:pt-32 md:pb-16 lg:w-1/2 lg:pt-44 lg:pb-24 xl:pt-48 xl:pb-32">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-green-700 transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>

            <div className="relative z-20 mx-auto lg:max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-md mx-auto lg:max-w-lg lg:mx-0 lg:text-left">
                <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                  {heading}
                </h1>
                <p className="mt-2 text-green-100 sm:mt-4 lg:mt-6 lg:text-xl">
                  {subheading}
                </p>
                <Button colorScheme='teal' size="lg" as={Link} to="/contact">Contact us</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <Image
            className="h-full w-56 object-cover sm:h-72 md:h-92 lg:w-full lg:h-full"
            image={image}
            alt=""
          />
        </div>
      </div>*/}

      {/* Featured projects */}
      <Container maxW="7xl" my={16}>
        <div className="flex justify-between items-baseline">
          <Heading as="h2" size="xl">
            Les dernières actus du club
          </Heading>
          <SeeMoreButton
            display={{ base: 'none', md: 'flex' }}
            to="/articles"
          />
        </div>
        <div className="mt-8">
          <CardSet posts={posts} subheading={'Actualités'} />
        </div>
        <SeeMoreButton
          display={{ base: 'flex', md: 'none' }}
          to="/articles"
          variant="outline"
          my={4}
          mx="auto"
          maxW="2xs"
        />
      </Container>

      <Container maxW="7xl" my={16}>
        <div className="flex justify-between items-baseline">
          <Heading as="h2" size="xl">
            Les derniers résultats du club
          </Heading>
          <SeeMoreButton
            display={{ base: 'none', md: 'flex' }}
            to="/results"
          />
        </div>
        <div className="mt-8">
          <CardSet posts={results} subheading={'Résultats'} />
        </div>
        <SeeMoreButton
          display={{ base: 'flex', md: 'none' }}
          to="/results"
          variant="outline"
          my={4}
          mx="auto"
          maxW="2xs"
        />
      </Container>

      {/* About section */}
      {/*<TextImageSplit image={about.image}>
        <SectionHeading>{about.heading}</SectionHeading>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          {about.description}
        </p>
        <SecondaryButton to={about.button.url} className="mt-6 lg:mt-10">
          {about.button.label}
        </SecondaryButton>
      </TextImageSplit>*/}
    </div>
  );
};

export default IndexPageTemplate;
