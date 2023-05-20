import React from 'react';
import { Link } from 'gatsby';
import Image from '../components/Image';
import * as dateFns from 'date-fns';
import frLocale from 'date-fns/locale/fr';
import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/react';

function BigCard({ image, heading, date, subtitle, url, ...rest }) {
  return (
    <Box
      as={Link}
      to={url}
      display="block"
      position="relative"
      className="group transform hover:-translate-y-2 duration-200"
      {...rest}
    >
      <Box
        as={Image}
        width="100%"
        height={{ base: 400, md: 600 }}
        borderRadius={20}
        image={image?.image || { url: '/static/assets/shuttle.jpg' }}
        alt={image?.alt || 'image de volant'}
        className="overflow-hidden"
      />
      <Flex
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        top={0}
        p={{ base: 6, md: 12 }}
        alignItems="flex-end"
      >
        <VStack spacing={2} alignItems="initial">
          <Text color="white" fontSize="sm">
            {dateFns.format(new Date(date), 'PP', {
              addSuffix: true,
              locale: frLocale,
            })}
          </Text>
          <Heading
            as="h3"
            color="white"
            fontSize={{ base: '2xl', sm: '3xl', md: '4xl', lg: '5xl' }}
          >
            {heading}
          </Heading>
          {subtitle && (
            <Text as="h4" fontSize="md" color="white">
              {subtitle}
            </Text>
          )}
        </VStack>
      </Flex>
    </Box>
  );
}

export default BigCard;
