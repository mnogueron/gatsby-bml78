import React from 'react';
import {Link} from 'gatsby';
import Image from '../components/Image';
import * as dateFns from 'date-fns';
import frLocale from 'date-fns/locale/fr';
import {Box, Heading, Text, VStack} from '@chakra-ui/react';

function Card({image, heading, date, subtitle, url, ...rest}) {
  return (
    <Box
      as={Link}
      role="group"
      to={url}
      sx={{
        transitionDuration: '200ms',
        ':hover': {
          transform: 'translateY(-0.5rem)',
        },
      }}
      {...rest}
    >
      <Image
        image={image?.image || {url: '/static/assets/shuttle.jpg'}}
        alt={image?.alt || 'image de volant'}
        className="rounded-md overflow-hidden"
      />
      <VStack spacing={2} alignItems="initial" mt={4}>
        <Text color="text.secondary" fontSize="sm">
          {dateFns.format(new Date(date), 'PP', {
            addSuffix: true,
            locale: frLocale,
          })}
        </Text>
        <Heading
          as="h3"
          color="text.main"
          size="sm"
          _groupHover={{
            textDecoration: 'underline',
          }}
        >
          {heading}
        </Heading>
        {subtitle && (
          <Text as="h4" fontSize="md" color="text.secondary">
            {subtitle}
          </Text>
        )}
      </VStack>
    </Box>
  );
}

export default Card;
