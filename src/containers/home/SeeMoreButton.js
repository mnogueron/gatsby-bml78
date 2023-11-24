import React from 'react';
import {Button, Icon} from '@chakra-ui/react';
import {Link} from 'gatsby';
import {MdChevronRight} from 'react-icons/md';

const SeeMoreButton = ({to, ...rest}) => {
  return (
    <Button
      variant="ghost"
      colorScheme="red"
      color="text.main"
      as={Link}
      to={to}
      rightIcon={<Icon as={MdChevronRight} boxSize={8} />}
      {...rest}
    >
      Voir plus
    </Button>
  );
};

export default SeeMoreButton;
