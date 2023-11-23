import React from 'react';
import {Link} from 'gatsby';
import Image from '../components/Image';
import * as dateFns from 'date-fns';
import frLocale from 'date-fns/locale/fr';
import {Heading, Text, VStack} from '@chakra-ui/react';

function Card({image, heading, date, subtitle, url, ...rest}) {
  return (
    <Link
      to={url}
      className="group transform hover:-translate-y-2 duration-200"
      {...rest}
    >
      <Image
        image={image?.image || {url: '/static/assets/shuttle.jpg'}}
        alt={image?.alt || 'image de volant'}
        className="rounded-md overflow-hidden"
      />
      <VStack spacing={2} alignItems="initial" mt={4}>
        <div className="flex items-baseline gap-x-2 justify-between">
          <Text color="text.secondary" fontSize="sm">
            {dateFns.format(new Date(date), 'PP', {
              addSuffix: true,
              locale: frLocale,
            })}
          </Text>
        </div>
        <Heading
          as="h3"
          color="text.main"
          size="sm"
          className="group-hover:underline"
        >
          {heading}
        </Heading>
        {subtitle && (
          <Text as="h4" fontSize="md" color="text.secondary">
            {subtitle}
          </Text>
        )}
      </VStack>
    </Link>
  );
}

export default Card;
