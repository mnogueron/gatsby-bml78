import React from 'react';
import {Button, ButtonProps, Icon} from '@chakra-ui/react';
import {Link} from 'gatsby';
import {MdChevronRight} from 'react-icons/md';

type SeeMoreButtonProps = {
  to: string;
} & ButtonProps;

const SeeMoreButton = ({to, ...rest}: SeeMoreButtonProps) => {
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
