import React from 'react';
import {Link} from 'gatsby';
import {HiArrowNarrowLeft} from 'react-icons/hi';
import {HStack, Text, Heading, Icon} from '@chakra-ui/react';

const NextArticleButton = ({to, title}) => {
  return (
    <Link to={to}>
      <HStack spacing={2} color="gray.500" alignItems="center" role="group">
        <Icon as={HiArrowNarrowLeft} boxSize={5} />
        <Text>Suivant</Text>
      </HStack>
      <Heading
        as="h3"
        color="gray.700"
        fontSize="lg"
        lineHeight="tall"
        _groupHover={{
          textDecoration: 'underline',
        }}
      >
        {title}
      </Heading>
    </Link>
  );
};

export default NextArticleButton;
