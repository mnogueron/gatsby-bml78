import React from 'react';
import * as dateFns from 'date-fns';
import frLocale from 'date-fns/locale/fr';
import {Box, BoxProps, Heading, Text, VStack} from '@chakra-ui/react';
import {Link} from 'gatsby';
import Image from './Image';

type CardProps = {
  image: any; // TODO type the image
  heading: string | null;
  date: string | null;
  subtitle: string | null;
  url: string | null;
} & BoxProps;

const Card = ({image, heading, date, subtitle, url, ...rest}: CardProps) => {
  return (
    <Box
      as={Link}
      role="group"
      to={url || '/'} // TODO ensure url is always defined
      sx={{
        transitionDuration: '200ms',
        ':hover': {
          transform: 'translateY(-0.5rem)',
        },
      }}
      {...rest}
    >
      <Box data-testid="card-image">
        <Image
          image={image?.image || {url: '/static/assets/shuttle.jpg'}}
          alt={image?.alt || 'image de volant'}
          borderRadius="md"
          overflow="hidden"
        />
      </Box>
      <VStack spacing={2} alignItems="initial" mt={4}>
        {date && (
          <Text color="text.secondary" fontSize="sm">
            {dateFns.format(new Date(date), 'PP', {
              locale: frLocale,
            })}
          </Text>
        )}
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
};

export default Card;
