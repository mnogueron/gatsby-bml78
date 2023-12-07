import React from 'react';
import {Link} from 'gatsby';
import {HiArrowNarrowRight} from 'react-icons/hi';
import {HStack, Text, Heading, Icon} from '@chakra-ui/react';

const PreviousArticleButton = ({to, title}) => {
  return (
    <Link to={to}>
      <HStack
        spacing={2}
        color="gray.500"
        alignItems="center"
        justifyContent="flex-end"
        role="group"
      >
        <Text>Précédent</Text>
        <Icon as={HiArrowNarrowRight} boxSize={5} />
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

export default PreviousArticleButton;
