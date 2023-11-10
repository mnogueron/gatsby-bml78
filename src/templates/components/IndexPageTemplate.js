import React from 'react';
import { Link } from 'gatsby';
import { Button, Container, Box, Heading, Text, Flex } from '@chakra-ui/react';
import Image from '../../components/Image';
import Banner from '../../components/Banner';
import ClubQuoteSection from '../../containers/home/ClubQuoteSection';
import LastNewsSection from '../../containers/home/LastNewsSection';
import LastResultsSection from "../../containers/home/LastResultsSection";

const IndexPageTemplate = ({
  heading,
  subheading,
  headerImage,
  image,
  banner,
  clubSectionContent,
  posts = [],
  results = [],
}) => {
  return (
    <>
      {/* Header */}
      <Box backgroundColor={'blackAlpha.100'} position="relative" as="header">
        <Container
          maxW="7xl"
          py={16}
          minHeight={{ base: 'calc(100vh - 48px)', sm: '768px' }}
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
                filter: 'blur(2px) grayscale(20%) brightness(0.6)',
                /*transform: 'scaleX(-1)',*/
                height: { base: '100%', sm: '100%' },
                width: { base: '100%', sm: '100%' },
                '& > div': {
                  height: { base: '100%', sm: '100%' },
                  width: { base: '100%', sm: '100%' },
                },

                '& [data-main-image]': {
                  objectPosition: {
                    base: '70%',
                    sm: '65%',
                    md: '40%',
                    lg: '50%',
                  },
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
            zIndex={0}
          >
            <Heading
              as="h1"
              size="4xl"
              lineHeight="shorter"
              color={'gray.100'}
              maxW={{ base: '100%', sm: '70%' }}
              mb={8}
              whiteSpace="pre-wrap"
            >
              {heading}
            </Heading>
            <Text
              fontSize="2xl"
              as="h2"
              color={'gray.200'}
              maxW={{ base: '100%', sm: '70%' }}
              mb={10}
              whiteSpace="pre-wrap"
            >
              {subheading}
            </Text>
            <Button
              colorScheme="red"
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

        {banner.text && !banner.hide && (
          <Box position="absolute" top={{ base: 4, lg: 8 }} left={4} right={4}>
            <Box maxW="4xl" margin="auto">
              <Banner text={banner.text} level={banner.level} />
            </Box>
          </Box>
        )}
      </Box>

      <ClubQuoteSection content={clubSectionContent} />
      <LastNewsSection posts={posts} />
      <LastResultsSection results={results} />
    </>
  );
};

export default IndexPageTemplate;
